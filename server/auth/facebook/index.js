'use strict';

import express from 'express';
import passport from 'passport';
import {setAuthorized} from '../auth.service';
import providerAccount from '../../models/providerAccount/providerAccount.model.js';

var router = express.Router();

export default function (providerAppCode) {
  router
    .get('/', function (req, res) {
      passport.authenticate('facebook' + providerAppCode, {
        scope: ['email', 'user_about_me', 'public_profile', 'user_friends'],
        failureRedirect: '/#/login',
        auth_type: 'reauthenticate',
        session: false,
        state: req.query.accountId
      })(req, res)
    })
    .get('/callback', passport.authenticate('facebook' + providerAppCode, {
      failureRedirect: '/#/login',
      session: false
    }), setAuthorized(providerAppCode));

  return router;
}
