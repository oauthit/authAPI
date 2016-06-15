'use strict';

import express from 'express';
import passport from 'passport';
import {setAuthorized} from '../auth.service';

var router = express.Router();

export default function (providerAppCode) {

  router
    .get('/', function (req, res) {
      passport.authenticate('sms', {
        failureRedirect: '/#/login',
        state: req.query.accountId
      })(req, res);
    })
    .get('/callback',  passport.authenticate('sms', {
      failureRedirect: '/#/login'
    }), setAuthorized(providerAppCode));

  return router;
}
