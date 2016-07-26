'use strict';

import express from 'express';
import passport from 'passport';
import {setAuthorized} from '../auth.service';
import providerAccount from '../../models/providerAccount/providerAccount.model';
import _ from 'lodash';

var debug = require('debug')('AuthAPI:auth:sms:index');
var router = express.Router();

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

  passport.use(require('./passport').setup(req, providerAccount(), providerApp));
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
