'use strict';

import {isAuthenticated} from '../auth/auth.service';

var router = require('express').Router();

router.use('/token', isAuthenticated(), require('./token'));
router.use('/account', isAuthenticated(), require('./account'));
router.use('/agent', isAuthenticated(), require('./agent'));

export default router;
