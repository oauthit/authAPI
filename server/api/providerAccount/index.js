'use strict';

var express = require('express');
var controller = require('./providerAccount.controller.js');

var router = express.Router();
import {hasRole} from '../../auth/auth.service';

router.get('/'/*hasRole('admin')*/, controller.findAll);
router.get('/me', controller.showMe);
router.get('/:id', /*hasRole('admin'),*/ controller.find);
router.put('/me', controller.updateMe);
router.put('/:id', hasRole('admin'), controller.update);
router.delete('/:id', controller.unlink);

module.exports = router;
