'use strict';

var express = require('express');
import controller from './app.controller.js';

var router = express.Router();
router.get('/', controller.index);
router.get('/:id', controller.show);

module.exports = router;
