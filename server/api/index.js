'use strict';

import {isAuthenticated} from '../auth/auth.service';

var router = require('express').Router();

router.use('/token', isAuthenticated(), require('./token'));
router.use('/providerAccount', isAuthenticated(), require('./providerAccount'));

export default router;
