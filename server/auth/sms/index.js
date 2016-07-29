'use strict';

import express from 'express';
import passport from 'passport';
import {setAuthorized} from '../auth.service';
import _ from 'lodash';
import config from '../../config/environment';

var debug = require('debug')('AuthAPI:auth:sms:index');
var router = express.Router();

const smsAuthUrl = config.smsAuth.url;
var providerApps = [];

function setPassportUse(req, res, next) {

  var urlParts = req.baseUrl.split('/');
  var name = _.last(urlParts);

  if (name === 'callback') {
    name = _.nth(urlParts,- 2);
  }

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
    scope: 'offline_access'
  };
  passport.use(require('./passport')(providerApp,config));
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

      passport.authenticate('sms' + req.AUTHAPIproviderApp.name, {
        failureRedirect: '/#/login',
        state: req.query.accountId
      })(req, res, next);

    })

    .get('/callback', setPassportUse, function (req, res, next) {

      passport.authenticate('sms' + req.AUTHAPIproviderApp.name, {
        failureRedirect: '/#/login'
      })(req, res, next);

    }, function (req, res, next) {
      setAuthorized(req.AUTHAPIproviderApp.code)(req, res, next);
    });

  return router;

}
