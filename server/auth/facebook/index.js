'use strict';

import express from 'express';
import passport from 'passport';
import {setAuthorized} from '../auth.service';

var router = express.Router();

router
  .get('/', passport.authenticate('facebook', {
    scope: ['email', 'user_about_me', 'public_profile', 'user_friends'],
    failureRedirect: '/#/login',
    auth_type: 'reauthenticate',
    session: false
  }))
  .get('/callback', passport.authenticate('facebook', {
    failureRedirect: '/#/login',
    session: false
  }), setAuthorized);

export default router;
