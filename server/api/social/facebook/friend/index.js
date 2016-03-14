'use strict';

import controller from './facebook.controller.js';
import setProviderToken from '../../../../middleware/setProviderToken.middleware';
var express = require('express');
var router = express.Router();

router.get('/', setProviderToken(), controller.get);
router.get('/:id', setProviderToken(), controller.getById);

module.exports = router;
