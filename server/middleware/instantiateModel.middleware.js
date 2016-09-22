'use strict';

import {baseStapiModel} from 'sistemium-node';

var debug = require('debug')('middleware:instantiate');

export default function (req, res, next) {
  if (req && req.params) {
    if (req.params.pool && req.params.tableName) {
      req.model = baseStapiModel(`/${req.params.pool}/${req.params.tableName}`);
      return next();
    } else {
      debug(`Incorrect route params, you should pass pool name and table name in params`);
      return res.sendStatus(400);
    }
  } else {
    debug(`Incorrect request object`);
    return res.sendStatus(400);
  }
}
