'use strict';

import express from 'express';
import passport from 'passport';
import config from '../config/environment';
import providerAccount from '../models/providerAccount/providerAccount.model.js';

// Passport Configuration
//require('./email/passport').setup();
require('./facebook/passport').setup(providerAccount(), config);
require('./google/passport').setup(providerAccount(), config);

var router = express.Router();

router.use('/email', require('./email'));
router.use('/pha', require('./pha'));
router.use('/facebook', require('./facebook'));
router.use('/google', require('./google'));

export default router;
