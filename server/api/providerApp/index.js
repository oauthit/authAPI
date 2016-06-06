'use strict';

var express = require('express');
var controller = require('./providerApp.controller.js');

var router = express.Router();
router.get('/', controller.publicFindAll);
router.get('/private', controller.privateFindAll);
router.get('/:id', controller.show);

module.exports = router;
