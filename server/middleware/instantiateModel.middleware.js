'use strict';

import stapi from '../models/abstract.model';
var debug = require('debug')('middleware:instantiate');

export default function (req, res, next) {
  if (req && req.params) {
    if (req.params.pool && req.params.tableName) {
      req.model = stapi(`/${req.params.pool}/${req.params.tableName}`);
      next();
    }
    else {
      debug(`Incorrect route params, you should pass pool name and table name in params`);
      return res.sendStatus(400);
    }
  } else {
    debug(`Incorrect request object`);
    return res.sendStatus(400);
  }
}
