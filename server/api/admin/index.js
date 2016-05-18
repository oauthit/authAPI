'use strict';

var express = require('express');
var router = express.Router();

router.use('/:tableName', require('./table'));
router.use('/org', require('./org'));
router.use('/provider', require('./provider'));

module.exports = router;
