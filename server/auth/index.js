'use strict';

import express from 'express';
import passport from 'passport';
import config from '../config/environment';

// Passport Configuration
require('./local/passport').setup(config);
require('./facebook/passport').setup(config);

var router = express.Router();

router.use('/local', require('./local'));
router.use('/facebook', require('./facebook'));

export default router;
