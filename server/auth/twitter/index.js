'use strict';

import express from 'express';
import passport from 'passport';
import twitterPassport from './passport';

var router = express.Router();

export default function (providerApp) {

  console.error(providerApp);

  passport.use(twitterPassport(providerApp));

  router
    .get('/', function (req, res) {
      passport.authenticate(providerApp.code, {
        failureRedirect: '/#/login',
        state: req.query.accountId
      })(req, res);
    });

  return router;
}

