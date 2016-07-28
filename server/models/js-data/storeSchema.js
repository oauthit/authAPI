'use strict';

import {jsDataSchema} from 'sistemium-node';
var config = require('../../config/environment');

//make possible to pass adapter
export default jsDataSchema(config);
