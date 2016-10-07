'use strict';

import express from 'express';
import passport from 'passport';
import vkontaktePassport from './passport';


export default function (providerApp) {

  var router = express.Router();

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

