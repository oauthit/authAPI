'use strict';

import express from 'express';
import passport from 'passport';
import config from '../config/environment';
import account from '../api/account/account.model.js';

// Passport Configuration
require('./facebook/passport').setup(account(), config);

var router = express.Router();

router.use('/pha', require('./pha'));
router.use('/facebook', require('./facebook'));

export default router;
