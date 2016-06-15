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
  console.log(fullUrl);
  fullUrl = req.originalUrl.indexOf('callback?code=') !== -1 ? fullUrl[fullUrl.length - 2] : fullUrl[fullUrl.length - 1];
  console.log(fullUrl);
  let providerApp = _.find(providerApps, (o) => {
    return o.code === fullUrl;
  });
  console.log(providerApps);
  console.log(providerApp);
  const strategy = require('../facebook/passport').setup(providerAccount(), providerApp);
  passport.use(strategy);
  console.log(strategy);
  console.log(providerApp);
  req.AUTHAPIproviderApp = providerApp;
  next();
}

export default function (providerApp) {
  providerApps.push(providerApp);
  router
    .get('/', setPassportUse, function (req, res) {
      console.log('passed passport.use');
      let providerApp = req.AUTHAPIproviderApp;
      passport.authenticate('facebook' + providerApp.code, {
        scope: ['email', 'user_about_me', 'public_profile', 'user_friends'],
        failureRedirect: '/#/login',
        auth_type: 'reauthenticate',
        session: false,
        state: req.query.accountId
      })(req, res);
    })
    .get('/callback', setPassportUse, function (req, res, next) {
      passport.authenticate('facebook' + req.AUTHAPIproviderApp.code, {
        failureRedirect: '/#/login',
        session: false
      })(req, res, next);
    }, function (req, res, next) {
      setAuthorized(req.AUTHAPIproviderApp.code)(req, res, next);
    });

  return router;
}
