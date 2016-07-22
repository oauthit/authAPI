'use strict';

import express from 'express';
import passport from 'passport';
import {setAuthorized} from '../auth.service';
import providerAccount from '../../models/providerAccount/providerAccount.model';
import _ from 'lodash';

var router = express.Router();

var providerApps = [];

function setPassportUse (req, res, next) {
  var fullUrl = req.originalUrl.split('/');
  fullUrl = req.originalUrl.indexOf('callback?code=') !== -1 ? fullUrl[fullUrl.length - 2] : fullUrl[fullUrl.length - 1];
  let providerApp = _.find(providerApps, (o) => {
    return o.code === fullUrl;
  });
  const strategy = require('../facebook/passport').setup(providerAccount(), providerApp);
  passport.use(strategy);
  req.AUTHAPIproviderApp = providerApp;
  next();
}

export default function (providerApp) {
  providerApps.push(providerApp);
  router
    .get('/', setPassportUse, function (req, res) {
      let providerApp = req.AUTHAPIproviderApp;
      console.log('req.headers.referer:', req.headers.referer);
      req.session.returnTo = req.headers.referer;
      console.log('req.session:', req.session);
      passport.authenticate('facebook' + providerApp.code, {
        scope: ['email', 'user_about_me', 'public_profile', 'user_friends'],
        failureRedirect: '/#/login',
        auth_type: 'reauthenticate',
        session: false,
        state: req.query.accountId
      })(req, res);
    })
    .get('/callback', setPassportUse, function (req, res, next) {
      console.log('req.session:', req.session);
      console.log('req.headers.referer:', req.headers.referer);
      passport.authenticate('facebook' + req.AUTHAPIproviderApp.code, {
        failureRedirect: '/#/login',
        session: false
      })(req, res, next);
    }, function (req, res, next) {
      setAuthorized(req.AUTHAPIproviderApp.code)(req, res, next);
    });

  return router;
}
