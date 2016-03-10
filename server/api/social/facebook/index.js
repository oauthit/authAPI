'use strict';

import controller from './friend/facebook.controller.js';
var express = require('express');
var router = express.Router();

router.get('/refreshToken', controller.refreshToken);

module.exports = router;
