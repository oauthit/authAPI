'use strict';

import express from 'express';
import providerApp from '../models/js-data/providerApp.model';
const debug = require('debug')('AuthAPI:auth:index');

var router = express.Router();

// Passport Configuration

providerApp.find()
  .then((providerApps) => {
    providerApps.forEach(providerApp => {
      router.use('/' + providerApp.code, require(`./${providerApp.provider}`)(providerApp));
    });
  })
  .catch(err => {
    debug('error:', err);
  })
;

export default router;
