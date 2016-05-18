'use strict';

import express from 'express';
import passport from 'passport';
import {setAuthorized} from '../auth.service';
import providerAccount from '../../models/providerAccount/providerAccount.model.js';
let ProviderAccount = providerAccount();

var router = express.Router();

router
  .get('/', function (req, res) {
    passport.authenticate('facebook', {
      scope: ['email', 'user_about_me', 'public_profile', 'user_friends'],
      failureRedirect: '/#/login',
      auth_type: 'reauthenticate',
      session: false,
      state: req.query.accountId
    })(req, res)
  })
  .get('/callback', passport.authenticate('facebook', {
    failureRedirect: '/#/login',
    session: false
  }), setAuthorized);

export default router;
