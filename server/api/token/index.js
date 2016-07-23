'use strict';

var express = require('express');
var controller = require('./token.controller');

var router = express.Router();

router.get('/:id?', controller.find);

module.exports = router;
