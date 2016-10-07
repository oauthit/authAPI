'use strict';

import express from 'express';
import passport from 'passport';
import mailruPassport from './passport';


export default function (providerApp) {

  var router = express.Router();

  passport.use(mailruPassport(providerApp));

  router
    .get('/', function (req, res) {
      passport.authenticate(providerApp.code, {
        failureRedirect: '/#/login',
        state: req.query.accountId
      })(req, res);
    });

  return router;
}

