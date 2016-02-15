'use strict';

var express = require('express');
var controller = require('./providerAccount.controller');

var router = express.Router();
import {hasRole} from '../../auth/auth.service';

router.get('/', hasRole('admin'), controller.index);
router.get('/me', controller.showMe);
router.get('/:id', hasRole('admin'), controller.show);

module.exports = router;
