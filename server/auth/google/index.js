'use strict';

import express from 'express';
import passport from 'passport';
import googlePassport from './passport';


export default function (providerApp) {

  var router = express.Router();

  passport.use(googlePassport(providerApp));

  router
    .get('/', function (req, res) {
      passport.authenticate(providerApp.code, {
        failureRedirect: '/#/login',
        scope: providerApp.scope, // ['https://www.googleapis.com/auth/userinfo.email','https://www.googleapis.com/auth/userinfo.profile'],
        accessType: providerApp.offline && 'online',
        approvalPrompt: 'force',
        state: req.query.accountId
      })(req, res);
    });

  return router;

}

