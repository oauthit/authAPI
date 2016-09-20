'use strict';

import express from 'express';
import providerApp from '../models/js-data/providerApp.model';
import {
  prepareToLinkProviderAccounts,
  setQueryParamsToSession,
  checkIfValidRedirectUri
} from '../middleware/authHelpers.middleware';
import {setAuthorized} from './auth.service';
import passport from 'passport';

const debug = require('debug')('AuthAPI:auth:index');

var router = express.Router();

// TODO: check oa2 errors and user decline callbacks


function routerFn(app) {
  return function (req, res, next) {
    console.log('AUTHROOT:', req.url);
    passport.authenticate(app.code,
      function (err, user, info) {

        console.error('info: ', info);
        if (err) {
          return next(err);
        }
        if (!user) {
          console.error(req.session);
          console.error(req.query);
          return res.redirect(req.session.returnTo);
        }
        // TODO check if this necessary
        req.logIn(user, function (err) {
          if (err) {
            return next(err);
          }
          return res.redirect('/users/' + user.username);
        });
      }
      // {
      //   failureRedirect: '/auth/error',
      //   session: false
      // }
    )(req, res, next);
  };
}

providerApp.find()
  .then((providerApps) => {

    providerApps.forEach(app => {

      var appPassport = require(`./${app.provider}`)(app);
      var authRoot = `/${app.provider}/${app.name}`;

      router.use(authRoot + '/', prepareToLinkProviderAccounts, setQueryParamsToSession, checkIfValidRedirectUri);
      router.use(authRoot, appPassport);
      console.error('authRoot:', authRoot);
      router.get(
        authRoot + '/callback',
        routerFn(app),
        setAuthorized(app)
      );

    });

  })
  .catch(err => {
    debug('error:', err);
  })
;

export default router;
