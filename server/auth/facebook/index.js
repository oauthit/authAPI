'use strict';

import express from 'express';
import passport from 'passport';
import {setAuthorized} from '../auth.service';
import providerAccount from '../../models/providerAccount/providerAccount.model.js';

var router = express.Router();

export default function (providerAppId) {
  router
    .get('/', function (req, res) {
      passport.authenticate('facebook' + providerAppId, {
        scope: ['email', 'user_about_me', 'public_profile', 'user_friends'],
        failureRedirect: '/#/login',
        auth_type: 'reauthenticate',
        session: false,
        state: req.query.accountId
      })(req, res)
    })
    .get('/callback', passport.authenticate('facebook' + providerAppId, {
      failureRedirect: '/#/login',
      session: false
    }), setAuthorized);

  return router;
}
