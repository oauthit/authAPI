'use strict';

import express from 'express';
import passport from 'passport';
import vkontaktePassport from './passport';

var router = express.Router();

export default function (providerApp) {

  passport.use(vkontaktePassport(providerApp));

  router
    .get('/', function (req, res) {
      passport.authenticate(providerApp.code, {
        failureRedirect: '/#/login',
        state: req.query.accountId
      })(req, res);
    });

  return router;
}

