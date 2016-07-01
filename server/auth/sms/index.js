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
  const strategy = require('./passport').setup(providerAccount(), providerApp);
  passport.use(strategy);
  req.AUTHAPIproviderApp = providerApp;
  next();
}

passport.serializeUser((user, done) => {
  debug('serializeUser:', user);
  done(null, user);
});

passport.deserializeUser((user, done) => {
  debug('deserialize:', user);
  done(null, user);
});

export default function (providerApp) {
  providerApps.push(providerApp);
  router
    .get('/', setPassportUse, function (req, res, next) {
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
