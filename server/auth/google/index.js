'use strict';

import express from 'express';
import passport from 'passport';
import {setAuthorized} from '../auth.service';
import providerAccount from '../../models/providerAccount/providerAccount.model';
import _ from 'lodash';

var router = express.Router();

var providerApps = [];

function setPassportUse(req, res, next) {
  let originalUrl = req.originalUrl;
  let fullUrl = originalUrl.split('/');

  let index = originalUrl.indexOf('callback?code=');
  let name = index === -1 ? fullUrl[fullUrl.length - 1] : fullUrl[fullUrl.length - 3];
  let providerApp = _.find(providerApps, (o) => {
    return o.name === name;
  });
  const strategy = require('./passport')(providerAccount(), providerApp);
  passport.use(strategy);
  req.AUTHAPIproviderApp = providerApp;
  next();
}

export default function (providerApp) {
  providerApps.push(providerApp);
  router
    .get('/', setPassportUse, function (req, res) {
      let providerApp = req.AUTHAPIproviderApp;
      passport.authenticate('google' + providerApp.code, {
        failureRedirect: '/#/login',
        scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/plus.profile.emails.read'],
        accessType: 'offline',
        approvalPrompt: 'force',
        state: req.query.accountId
      })(req, res);
    })
    .get('/callback', setPassportUse, function (req, res, next) {
      passport.authenticate('google' + req.AUTHAPIproviderApp.code, {
        failureRedirect: '/#/login',
        session: false
      })(req, res, next);
    }, function (req, res, next) {
      setAuthorized(req.AUTHAPIproviderApp.code)(req, res, next);
    });

  return router;
}

