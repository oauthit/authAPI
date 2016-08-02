'use strict';

import express from 'express';
import passport from 'passport';
import googlePassport from './passport';

var router = express.Router();

export default function (providerApp) {

  passport.use(googlePassport(providerApp));

  router
    .get('/', function (req, res) {
      passport.authenticate(providerApp.code, {
        failureRedirect: '/#/login',
        scope: ['https://www.googleapis.com/auth/userinfo.email',
          'https://www.googleapis.com/auth/userinfo.profile'],
        //accessType: 'online',
        approvalPrompt: 'force',
        state: req.query.accountId
      })(req, res);
    });

  return router;
}

