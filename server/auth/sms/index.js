'use strict';

import express from 'express';
import passport from 'passport';
import {setAuthorized} from '../auth.service';
import _ from 'lodash';
import config from '../../config/environment';

var debug = require('debug')('AuthAPI:auth:sms:index');
var router = express.Router();

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

  if (!providerApp) {
    return new Error('setPassportUse with no providerApp');
  }

  const smsAuthUrl = _.get(config,'smsAuth.' + providerApp.name + '.url') || providerApp.url;

  let appConfig = {
    authorizationURL: smsAuthUrl + '/dialog/authorize',
    tokenURL: smsAuthUrl + '/oauth/token',
    scope: 'offline_access'
  };

  passport.use(require('./passport')(smsAuthUrl)(providerApp, appConfig));

  router

    .get('/', function (req, res, next) {

      if (req.session) {
        req.session.returnTo = req.headers.referer;
      }

      passport.authenticate(providerApp.code, {
        failureRedirect: '/#/login',
        state: req.query.accountId
      })(req, res, next);

    })

    .get('/callback', function (req, res, next) {

      passport.authenticate(providerApp.code, {
        failureRedirect: '/#/login'
      })(req, res, next);

    }, function (req, res, next) {
      setAuthorized(providerApp)(req, res, next);
    });

  return router;

}
