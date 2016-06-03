'use strict';

import express from 'express';
import passport from 'passport';
import config from '../config/environment';
import providerAccount from '../models/providerAccount/providerAccount.model';
import providerApp from '../models/js-data/providerApp.model';
import winston from 'winston';

var router = express.Router();

// Passport Configuration

providerApp.find()
  .then((providerApps) => {
    providerApps.forEach((providerApp) => {
      switch (providerApp.provider) {
        case 'facebook': {
          require('./facebook/passport').setup(providerAccount(), providerApp);
          router.use('/'+providerApp.code, require('./facebook')(providerApp.code));
          break;
        }
        case 'google': {
          require('./google/passport').setup(providerAccount(), providerApp);
          router.use('/'+providerApp.code, require('./google')(providerApp.code))
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
