'use strict';

var express = require('express');
var router = express.Router();

router.get('/refreshToken', controller.refreshToken);

module.exports = router;
