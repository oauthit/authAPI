'use strict';

var express = require('express');
import controller from './org.controller.js';
import {stripIdFromName} from '../../middleware/authHelpers.middleware';

var router = express.Router();

router.use(stripIdFromName('org'));

export default router;

router.get('/', controller.index);
router.get('/:id', controller.show);

router.post('/', controller.create);
router.put('/:id', controller.create);

router.delete('/:id', controller.destroy);
