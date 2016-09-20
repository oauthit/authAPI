'use strict';

import express from 'express';
import passport from 'passport';
import odnoklassnikiPassport from './passport';


export default function (providerApp) {

  var router = express.Router();

  passport.use(odnoklassnikiPassport(providerApp, {
    clientPublic: providerApp.clientPublic
  }));

  router
    .get('/', function (req, res, next) {
      passport.authenticate(providerApp.code, {
        scope: ['VALUABLE_ACCESS', 'GET_EMAIL'],
        failureRedirect: '/#/login',
        // state: req.query.accountId
      })(req, res, next);
    });

  return router;
}

