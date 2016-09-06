'use strict';

import express from 'express';
import providerApp from '../models/js-data/providerApp.model';
import {prepareToLinkProviderAccounts, setQueryParamsToSession, checkIfValidRedirectUri} from '../middleware/authHelpers.middleware';
import {setAuthorized} from './auth.service';
import passport from 'passport';

const debug = require('debug')('AuthAPI:auth:index');

var router = express.Router();

// TODO: check oa2 errors and user decline callbacks

providerApp.find()
  .then((providerApps) => {

    providerApps.forEach(app => {

      var appPassport = require(`./${app.provider}`)(app);
      var authRoot = `/${app.provider}/${app.name}`;

      router.use(authRoot + '/', prepareToLinkProviderAccounts, setQueryParamsToSession, checkIfValidRedirectUri);
      router.use(authRoot, appPassport);
      console.error('authRoot:', authRoot);
      router.get(authRoot + '/callback',
        function (req, res, next) {
          passport.authenticate(app.code, {
            failureRedirect: '/#/login',
            session: false
          })(req, res, next);
        },
        setAuthorized(app)
      );

    });

  })
  .catch(err => {
    debug('error:', err);
  })
;

export default router;
