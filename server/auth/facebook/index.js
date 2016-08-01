'use strict';

import express from 'express';
import passport from 'passport';
import {setAuthorized} from '../auth.service';
import fbPassport from './passport';

var router = express.Router();

export default function (providerApp) {

  passport.use(fbPassport(providerApp));

  router
    .get('/', function (req, res) {

      if (req.session) {
        req.session.returnTo = req.headers.referer;
      }

      passport.authenticate(providerApp.code, {
        scope: ['email', 'user_about_me', 'public_profile', 'user_friends'],
        failureRedirect: '/#/login',
        auth_type: 'reauthenticate',
        session: false,
        state: req.query.accountId
      })(req, res);

    })
    .get('/callback', function (req, res, next) {
      passport.authenticate(providerApp.code, {
        failureRedirect: '/#/login',
        session: false
      })(req, res, next);
    }, function (req, res, next) {
      setAuthorized(providerApp)(req, res, next);
    });

  return router;
}
