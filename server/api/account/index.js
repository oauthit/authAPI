'use strict';

var express = require('express');
var controller = require('./account.controller.js');

var router = express.Router();
import {hasRole} from '../../auth/auth.service';
import {ensureItsMe} from '../../middleware/checkAuthenticated.middleware';

router.get('/', /*hasRole('admin'),*/ controller.index);
router.get('/me', ensureItsMe, controller.show);
router.get('/:id', hasRole('admin'), controller.show);

router.post('/', hasRole('admin'), controller.create);
router.put('/me', ensureItsMe, controller.update);
router.put('/:id', ensureItsMe, controller.update);

module.exports = router;
