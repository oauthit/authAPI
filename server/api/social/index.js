'use strict';

var express = require('express');
var router = express.Router();

router.use('/google', require('./google'));
router.use('/vk', require('./vk'));
router.use('/facebook', require('./facebook'));
router.use('/socialAccount', require('./socialAccountSTAPI'));

module.exports = router;
