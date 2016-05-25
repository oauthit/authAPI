'use strict';

import express from 'express';
import passport from 'passport';
import config from '../config/environment';
import providerAccount from '../models/providerAccount/providerAccount.model.js';
import stapi from '../models/abstract.model';
const providerApp = stapi('/aa/providerApp');
import winston from 'winston';

var router = express.Router();

// Passport Configuration

providerApp().find()
  .then((providerApps) => {
    providerApps.forEach((providerApp) => {
      switch (providerApp.provider) {
        case 'facebook': {
          require('./facebook/passport').setup(providerAccount(), providerApp);
          router.use('/'+providerApp.id, require('./facebook')(providerApp.id));
          break;
        }
        case 'google': {
          require('./google/passport').setup(providerAccount(), providerApp);
          router.use('/'+providerApp.id, require('./google')(providerApp.id))
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
