'use strict';

import express from 'express';
import passport from 'passport';
import config from '../config/environment';
import Account from '../api/providerAccount/providerAccount.model';

// Passport Configuration
require('./local/passport').setup(Account, config);
require('./facebook/passport').setup(Account, config);

var router = express.Router();

router.use('/local', require('./local'));
router.use('/facebook', require('./facebook'));

export default router;
