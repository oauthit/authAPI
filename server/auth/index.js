'use strict';

import express from 'express';
import providerApp from '../models/js-data/providerApp.model';
import {prepareToLinkProviderAccounts, setReturnTo} from '../middleware/authHelpers.middleware';
const debug = require('debug')('AuthAPI:auth:index');

var router = express.Router();

// TODO: check oa2 errors and user decline callbacks

// Passport Configuration

providerApp.find()
  .then((providerApps) => {
    // console.log(providerApps);
    providerApps.forEach(app => {
      var passport = require(`./${app.provider}`)(app);
      var authRoot = `/${app.provider}/${app.name}`;
      router.use(authRoot + '/', prepareToLinkProviderAccounts, setReturnTo);
      router.use(authRoot, passport);
    });
  })
  .catch(err => {
    debug('error:', err);
  })
;

export default router;
