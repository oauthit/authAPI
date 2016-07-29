'use strict';

import express from 'express';
import passport from 'passport';
import {setAuthorized} from '../auth.service';
import providerAccount from '../../models/providerAccount/providerAccount.model';
import _ from 'lodash';
import config from '../../config/environment';

var debug = require('debug')('AuthAPI:auth:sms:index');
var router = express.Router();

const smsAuthUrl = config.smsAuth.url;
var providerApps = [];

function setPassportUse(req, res, next) {

  var fullUrl = req.originalUrl.split('/');
  var name = req.originalUrl.indexOf('callback?code=') !== -1 ? fullUrl[fullUrl.length - 2] : fullUrl[fullUrl.length - 1];

  let providerApp = _.find(providerApps, {name: name});

  debug('setPassportUse providerApp:', providerApp);

  if (!providerApp) {
    let redirectUrl = req.session.returnTo;
    let error = 'Authorization denied!';
    return res.redirect(`${redirectUrl}#/login?error=${error}`);
  }

  let config = {
    authorizationURL: smsAuthUrl + '/dialog/authorize',
    tokenURL: smsAuthUrl + '/oauth/token',
    //TODO change record for correct clientID and clientSecret
    clientID: 'db089742-97e7-483d-ba7f-7b4a0485b082',
    clientSecret: 'someSecret' || providerApp.clientSecret,
    scope: 'offline_access'
  };
  passport.use(require('./passport')(
    providerAccount(),
    providerApp,
    config)
  );
  req.AUTHAPIproviderApp = providerApp;
  next();

}

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

  providerApps.push(providerApp);

  router

    .get('/', setPassportUse, function (req, res, next) {

      req.session.returnTo = req.headers.referer;

      passport.authenticate('sms', {
        failureRedirect: '/#/login',
        state: req.query.accountId
      })(req, res, next);

    })

    .get('/callback', setPassportUse, function (req, res, next) {

      passport.authenticate('sms', {
        failureRedirect: '/#/login'
      })(req, res, next);

    }, function (req, res, next) {
      setAuthorized(req.AUTHAPIproviderApp.code)(req, res, next);
    });

  return router;

}
