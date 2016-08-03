'use strict';

import {setAccount} from '../../middleware/authHelpers.middleware';
var express = require('express');
var controller = require('./org.controller.js');

var router = express.Router();
router.get('/', setAccount, controller.index);
router.get('/:id', setAccount, controller.show);

router.post('/', controller.create);

module.exports = router;
