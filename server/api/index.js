'use strict';

import {isAuthenticated} from '../auth/auth.service';
import {setAccount, setOrgApp} from '../middleware/authHelpers.middleware';

var router = require('express').Router();
var authMiddleware = [isAuthenticated(), setAccount, setOrgApp];

router.use('/token', authMiddleware, require('./token'));
router.use('/providerAccount', /*authMiddleware,*/ require('./providerAccount'));
router.use('/providerApp', /*authMiddleware*/ require('./providerApp'));
router.use('/role', authMiddleware, require('./role'));
router.use('/roles', ...authMiddleware, require('./roles'));

router.use('/org', ...authMiddleware, require('./org'));
router.use('/orgRole', ...authMiddleware, require('./orgRole'));
router.use('/orgAccount', ...authMiddleware, require('./orgAccount'));
router.use('/orgAccountRole', ...authMiddleware, require('./orgAccountRole'));
router.use('/orgApp', ...authMiddleware, require('./orgApp'));
router.use('/orgProviderApp', /*authMiddleware*/ require('./orgProviderApp'));
router.use('/app', ...authMiddleware, require('./app'));
router.use('/account', ...authMiddleware, require('./account'));
router.use('/admin', require('./admin'));
router.use('/social', ...authMiddleware, require('./social'));

export default router;
