'use strict';

import {isAuthenticated, hasRole} from '../auth/auth.service';
var router = require('express').Router();

router.use('/token', isAuthenticated(), require('./token'));
router.use('/providerAccount', hasRole('isAdmin'), require('./providerAccount'));

export default router;
