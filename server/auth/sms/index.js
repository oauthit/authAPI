'use strict';

import express from 'express';
import passport from 'passport';
import _ from 'lodash';
import config from '../../config/environment';
import smsPassport from './passport';

var debug = require('debug')('AuthAPI:auth:sms:index');

passport.serializeUser((user, done) => {
//  debug('serializeUser:', user);
//  console.log('serializeUser:', user);
  done(null, user);
});

passport.deserializeUser((user, done) => {
//  debug('deserialize:', user);
//  console.log('deserialize:', user);
  done(null, user);
});

export default function (providerApp) {

  var router = express.Router();

  if (!providerApp) {
    return new Error('setPassportUse with no providerApp');
  }

  const smsAuthUrl = _.get(config,'smsAuth.' + providerApp.name + '.url') || providerApp.url;

  let appConfig = {
    authorizationURL: smsAuthUrl + '/dialog/authorize',
    tokenURL: smsAuthUrl + '/oauth/token',
    scope: providerApp.scope, // 'offline_access'
  };

  passport.use(smsPassport(smsAuthUrl)(providerApp, appConfig));

  router

    .get('/', function (req, res, next) {

      passport.authenticate(providerApp.code, {
        failureRedirect: '/#/login',
        state: req.query.accountId
      })(req, res, next);

    });

  return router;

}
