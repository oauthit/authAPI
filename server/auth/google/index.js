'use strict';

import express from 'express';
import passport from 'passport';
import {setAuthorized} from '../auth.service';

var router = express.Router();

export default function (providerApp) {

  passport.use(require('./passport')(providerApp));

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
    })
    .get('/callback', function (req, res, next) {
      passport.authenticate(providerApp.code, {
        failureRedirect: '/#/login',
        session: false
      })(req, res, next);
    }, function (req, res, next) {
      setAuthorized(providerApp)(req, res, next);
    });

  return router;
}

