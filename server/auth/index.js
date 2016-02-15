'use strict';

import express from 'express';
import passport from 'passport';
import config from '../config/environment';
import Account from '../api/providerAccount/account.model.js';

// Passport Configuration
require('./facebook/passport').setup(Account, config);

var router = express.Router();

router.use('/pha', require('./pha'));
router.use('/facebook', require('./facebook'));

export default router;
