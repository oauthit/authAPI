'use strict';

var express = require('express');
import controller from './app.controller.js';
import {stripIdFromName} from '../../middleware/authHelpers.middleware';

var router = express.Router();

router.use(stripIdFromName('app'));

router.get('/', controller.index);
router.get('/:id', controller.show);

module.exports = router;
