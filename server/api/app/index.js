'use strict';

var express = require('express');
var controller = require('./app.controller.js');

var router = express.Router();
router.get('/', controller.findAll);
router.get('/:id', controller.find);

module.exports = router;
