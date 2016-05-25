'use strict';

import express from 'express';
import passport from 'passport';
import {setAuthorized} from '../auth.service';

var router = express.Router();

export default function (providerAppId) {

  router
    .get('/', function (req, res) {
      passport.authenticate('google' + providerAppId, {
        failureRedirect: '/#/login',
        scope: [ 'https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/plus.profile.emails.read' ],
        accessType: 'offline',
        approvalPrompt: 'force',
        state: req.query.accountId
      })(req, res)
    })
    .get('/callback', passport.authenticate('google' + providerAppId, {
      failureRedirect: '/#/login',
      session: false
    }), setAuthorized);

  return router;
};
