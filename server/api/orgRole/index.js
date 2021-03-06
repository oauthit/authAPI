'use strict';

var express = require('express');
import controller from './orgRole.controller';
import {stripIdFromName} from '../../middleware/authHelpers.middleware';

var router = express.Router();

router.use(stripIdFromName('orgRole'));

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.delete('/:id', controller.destroy);

module.exports = router;
