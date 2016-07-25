'use strict';

import express from 'express';
import providerApp from '../models/js-data/providerApp.model';
const debug = require('debug')('AuthAPI:auth:index');

var router = express.Router();

// Passport Configuration

providerApp.find()
  .then((providerApps) => {
    providerApps.forEach(app => {
      var passport = require(`./${app.provider}`)(app);
      router.use('/' + app.code, passport);
      router.use(`/${app.provider}/${app.name}`, passport);
    });
  })
  .catch(err => {
    debug('error:', err);
  })
;

export default router;
