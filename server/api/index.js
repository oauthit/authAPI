'use strict';

import {isAuthenticated} from '../auth/auth.service';
import checkUser from '../middleware/checkAuthenticated.middleware';

var router = require('express').Router();

router.use('/token', isAuthenticated(), require('./token'));
router.use('/providerAccount', isAuthenticated(), require('./providerAccount'));
router.use('/providerApp' /*isAuthenticated()*/, require('./providerApp'));
router.use('/org', /*isAuthenticated()*/ require('./org'));
router.use('/orgProviderApp', /*isAuthenticated()*/ require('./orgProviderApp'));
router.use('/socialAccount', isAuthenticated(), require('./social/socialAccountSTAPI'));
router.use('/account', /*isAuthenticated(),*/ require('./account'));
router.use('/admin', require('./admin'));
router.use('/facebook/friend', isAuthenticated(), checkUser(), require('./social/facebook/friend'));
router.use('/facebook', isAuthenticated(), require('./social/facebook'));
router.use('/google/friend', isAuthenticated(), checkUser(), require('./social/google/friend'));
export default router;
