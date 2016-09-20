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


router.get('/error', (req, res) => {

  console.error('req.sesstion:', req.session);
  console.error(req.session);
  console.error(req.query);

  var err;

  var returnTo = req.session.returnTo || '';
  var errorMsg = err && err.text || req.query.error || 'authError';
  // TODO: get login page with aa.App field
  return res.redirect(`${returnTo}/#/login?error=${errorMsg}`);

});

function routerFn(app) {
  return passport.authenticate(app.code, {
    failureRedirect: '/auth/error',
    failureMessage: true,
    session: false
  });
}

// function (err, user) {
//
//   // console.error('info: ', info);
//
//   if (err || !user) {
//     console.error(req.session);
//     console.error(req.query);
//     var returnTo = req.session.returnTo || '';
//     var errorMsg = err && err.text || req.query.error || 'authError';
//     return res.redirect(`${returnTo}/#/login?error=${errorMsg}`);
//   }
//
//   req.logIn(user, function (err) {
//     if (err) {
//       return next(err);
//     }
//     return next();
//   });
//
// }

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
