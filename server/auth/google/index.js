'use strict';

import express from 'express';
import passport from 'passport';
import {setAuthorized} from '../auth.service';

var router = express.Router();

router
  .get('/', passport.authenticate('google', {
    scope: [ 'https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/plus.profile.emails.read' ]
  }))
  .get('/callback', passport.authenticate('google', {
    failureRedirect: '/#/login',
    session: false
  }), setAuthorized);

export default router;
