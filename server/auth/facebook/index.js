'use strict';

import express from 'express';
import passport from 'passport';
import {setAuthorized} from '../auth.service';

import _ from 'lodash';
import fbPassport from './passport';

var router = express.Router();

var providerApps = [];

function setPassportUse (req, res, next) {

  var fullUrl = req.originalUrl.split('/');
  var name = req.originalUrl.indexOf('callback?code=') !== -1 ? fullUrl[fullUrl.length - 2] : fullUrl[fullUrl.length - 1];

  let providerApp = _.find(providerApps, {name: name});

  passport.use(fbPassport(providerApp));
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
      passport.authenticate('facebook' + providerApp.name, {
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
      passport.authenticate('facebook' + req.AUTHAPIproviderApp.name, {
        failureRedirect: '/#/login',
        session: false
      })(req, res, next);
    }, function (req, res, next) {
      setAuthorized(req.AUTHAPIproviderApp.code)(req, res, next);
    });

  return router;
}
