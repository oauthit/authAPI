'use strict';

import express from 'express';
import passport from 'passport';
import {setAuthorized} from '../auth.service';

var router = express.Router();

export default function (providerAppCode) {

  router
    .get('/', function (req, res) {
      passport.authenticate('google' + providerAppCode, {
        failureRedirect: '/#/login',
        scope: [ 'https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/plus.profile.emails.read' ],
        accessType: 'offline',
        approvalPrompt: 'force',
        state: req.query.accountId
      })(req, res)
    })
    .get('/callback', passport.authenticate('google' + providerAppCode, {
      failureRedirect: '/#/login',
      session: false
    }), setAuthorized);

  return router;
}
