'use strict';

var express = require('express');
var router = express.Router();
import instantiateModel from '../../middleware/instantiateModel.middleware';

router.use('/:pool/:tableName', instantiateModel, require('./table'));
router.use('/org', require('./org'));
router.use('/provider', require('./provider'));

module.exports = router;
