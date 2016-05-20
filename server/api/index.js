'use strict';

import {isAuthenticated} from '../auth/auth.service';
import checkUser from '../middleware/checkAuthenticated.middleware';

var router = require('express').Router();

router.use('/token', isAuthenticated(), require('./token'));
router.use('/providerAccount', isAuthenticated(), require('./providerAccount'));
router.use('/socialAccount', isAuthenticated(), require('./social/socialAccountSTAPI'));
router.use('/account', /*isAuthenticated(),*/ require('./account'));
router.use('/agent', isAuthenticated(), require('./agent'));
router.use('/admin', require('./admin'));
router.use('/facebook/friend', isAuthenticated(), checkUser(), require('./social/facebook/friend'));
router.use('/facebook', isAuthenticated(), require('./social/facebook'));
router.use('/google/friend', isAuthenticated(), checkUser(), require('./social/google/friend'));
export default router;
