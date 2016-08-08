'use strict';

var express = require('express');
import controller from './role.controller.js';
import {stripIdFromName} from '../../middleware/authHelpers.middleware';

var router = express.Router();

router.use(stripIdFromName('role'));

router.get('/', controller.index);
router.get('/:id', controller.show);

module.exports = router;
