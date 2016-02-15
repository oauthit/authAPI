'use strict';

import {isAuthenticated} from '../auth/auth.service';

var router = require('express').Router();

router.use('/token', isAuthenticated(), require('./token'));
router.use('/account', isAuthenticated(), require('./account'));

export default router;
