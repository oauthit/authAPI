'use strict';

import {isAuthenticated} from '../auth/auth.service';
import checkUser from '../middleware/checkAuthenticated.middleware';

var router = require('express').Router();

router.use('/token', isAuthenticated(), require('./token'));
router.use('/providerAccount', /*isAuthenticated(),*/ require('./providerAccount'));
router.use('/providerApp', /*isAuthenticated()*/ require('./providerApp'));
router.use('/org', isAuthenticated(), require('./org'));
router.use('/app', isAuthenticated(), require('./app'));
router.use('/orgApp', isAuthenticated(), require('./orgApp'));
router.use('/orgProviderApp', /*isAuthenticated()*/ require('./orgProviderApp'));
router.use('/account', /*isAuthenticated(),*/ require('./account'));
router.use('/admin', require('./admin'));
export default router;
