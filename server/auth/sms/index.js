'use strict';

import express from 'express';
import passport from 'passport';
import {setAuthorized} from '../auth.service';
import providerAccount from '../../models/providerAccount/providerAccount.model';
import _ from 'lodash';

var debug = require('debug')('AuthAPI:sms/index.js');
var router = express.Router();

var providerApps = [];

function setPassportUse (req, res, next) {
  var fullUrl = req.originalUrl.split('/');
  fullUrl = req.originalUrl.indexOf('callback?code=') !== -1 ? fullUrl[fullUrl.length - 2] : fullUrl[fullUrl.length - 1];
  let providerApp = _.find(providerApps, (o) => {
    return o.code === fullUrl;
  });
  debug('setPassportUse providerApp:', providerApp);
  console.log('setPassportUse providerApp:', providerApp);
  if (!providerApp) {
    return next('no providerApp...');
  }
  const strategy = require('./passport').setup(req, providerAccount(), providerApp);
  passport.use(strategy);
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
      console.log('req.headers.referer:', req.headers.referer);
      req.session.returnTo = req.headers.referer;
      console.log('req.session:', req.session);
      passport.authenticate('sms', {
        failureRedirect: '/#/login',
        state: req.query.accountId
      })(req, res, next);
    })
    .get('/callback', setPassportUse, function (req, res, next) {
      console.log('req.session:', req.session);
      console.log('req.headers.referer:', req.headers.referer);
      passport.authenticate('sms', {
        failureRedirect: '/#/login'
      })(req, res, next);
    }, function (req, res, next) {
      setAuthorized(req.AUTHAPIproviderApp.code)(req, res, next);
    });

  return router;
}
