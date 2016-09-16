'use strict';

import express from 'express';
import passport from 'passport';
import twitterPassport from './passport';


export default function (providerApp) {

  var router = express.Router();

  passport.use(twitterPassport(providerApp, {
    consumerKey: providerApp.clientId,
    consumerSecret: providerApp.clientSecret
  }));

  router
    .get('/', function (req, res, next) {
      passport.authenticate(providerApp.code, {
        failureRedirect: '/#/login',
        // state: req.query.accountId
      })(req, res, next);
    });

  return router;
}

