'use strict';

var express = require('express');
var controller = require('./account.controller.js');

var router = express.Router();
import {hasRole} from '../../auth/auth.service';

router.get('/', /*hasRole('admin'),*/ controller.index);
router.get('/me', controller.showMe);
router.get('/:id', hasRole('admin'), controller.show);
router.put('/me', controller.updateMe);
router.post('/', controller.create)
router.put('/:id', hasRole('admin'), controller.update);

module.exports = router;
