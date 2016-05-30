'use strict';

var express = require('express');
var controller = require('./providerApp.controller.js');

var router = express.Router();
router.get('/', controller.index);

module.exports = router;
