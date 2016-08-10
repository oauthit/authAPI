'use strict';

import express from 'express';
import passport from 'passport';
import VkontaktePassport from './passport';

var router = express.Router();

export default function (providerApp) {

  passport.use(VkontaktePassport(providerApp));

  router
    .get('/', function (req, res) {
      passport.authenticate(providerApp.code, {
        failureRedirect: '/#/login',
        state: req.query.accountId
      })(req, res);
    });

  return router;
}

