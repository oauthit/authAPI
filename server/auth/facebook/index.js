'use strict';

import express from 'express';
import passport from 'passport';
import fbPassport from './passport';


export default function (providerApp) {

  var router = express.Router();

  passport.use(fbPassport(providerApp));

  router
    .get('/', function (req, res) {

      passport.authenticate(providerApp.code, {
        scope: ['email', 'user_about_me', 'public_profile', 'user_friends'],
        failureRedirect: '/#/login',
        auth_type: 'reauthenticate',
        session: false,
        state: req.query.accountId
      })(req, res);

    });

  return router;
}
