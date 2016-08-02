'use strict';

var express = require('express');
var controller = require('./org.controller.js');

var router = express.Router();
router.get('/', controller.findAll);
router.get('/:id', controller.find);

router.post('/', controller.create);

module.exports = router;
