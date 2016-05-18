'use strict';

import controller from './facebook.controller.js';
import setProviderToken from '../../../../middleware/setProviderToken.middleware';
var express = require('express');
var router = express.Router();

router.get('/', setProviderToken(), controller.index);
router.get('/:id', setProviderToken(), controller.show);

module.exports = router;
