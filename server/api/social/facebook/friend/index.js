'use strict';

import controller from './facebook.controller.js';
var express = require('express');
var router = express.Router();

router.get('/', controller.get);
router.get('/:id', controller.getById);

module.exports = router;
