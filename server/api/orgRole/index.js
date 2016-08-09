'use strict';

var express = require('express');
import controller from './orgRole.controller';
import {stripIdFromName} from '../../middleware/authHelpers.middleware';

var router = express.Router();

router.use(stripIdFromName('orgRole'));

router.get('/', controller.index);
router.get('/:id', controller.show);

module.exports = router;
