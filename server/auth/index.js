'use strict';

import express from 'express';
import passport from 'passport';
import config from '../config/environment';
import providerAccount from '../models/providerAccount/providerAccount.model';
import providerApp from '../models/js-data/providerApp.model';
import winston from 'winston';
const debug = require('debug')('AuthAPI:auth.index.js');

var router = express.Router();

// Passport Configuration

providerApp.find()
  .then((providerApps) => {
    providerApps.forEach((providerApp) => {
      switch (providerApp.provider) {
        case 'facebook': {
          router.use('/'+providerApp.code, require('./facebook')(providerApp));
          break;
        }
        case 'google': {
          router.use('/'+providerApp.code, require('./google')(providerApp));
          break;
        }
        case 'sms': {
          require('./sms/passport').setup(providerAccount(), providerApp);
          router.use('/' + providerApp.code, require('./sms')(providerApp.code));
          break;
        }
      }
    });
  })
  .catch((err) => {
    winston.log('error', err);
  })
;

//
//router.use('/email', require('./email'));
//router.use('/pha', require('./pha'));
//router.use('/facebook', require('./facebook'));
//router.use('/google', require('./google'));

export default router;
