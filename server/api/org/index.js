'use strict';

import {setAccount} from '../../middleware/authHelpers.middleware';
var express = require('express');
import controller from './org.controller.js';

var router = express.Router();

export default router;

router.get('/', setAccount, controller.index);
router.get('/:id', setAccount, controller.show);

router.post('/', controller.create);
router.put('/:id', controller.create);

router.delete('/:id', controller.destroy);
