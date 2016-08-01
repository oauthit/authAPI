'use strict';

import {isAuthenticated} from '../auth/auth.service';

var router = require('express').Router();
var authMiddleware = isAuthenticated();

router.use('/token', authMiddleware, require('./token'));
router.use('/providerAccount', /*authMiddleware,*/ require('./providerAccount'));
router.use('/providerApp', /*authMiddleware*/ require('./providerApp'));
router.use('/org', authMiddleware, require('./org'));
router.use('/app', authMiddleware, require('./app'));
router.use('/orgApp', authMiddleware, require('./orgApp'));
router.use('/orgProviderApp', /*authMiddleware*/ require('./orgProviderApp'));
router.use('/account', authMiddleware, require('./account'));
router.use('/admin', require('./admin'));

export default router;
