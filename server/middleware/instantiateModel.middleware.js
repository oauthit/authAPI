'use strict';

import stapi from '../models/abstract.model';

export default function (req, res, next) {
  if (req && req.params) {
    if (req.params.pool && req.params.tableName) {
      req.model = stapi(`/${req.params.pool}/${req.params.tableName}`);
      next();
    }
    else {
      winston.warn(`Incorrect route params, you should pass pool name and table name in params`);
      return res.sendStatus(400);
    }
  } else {
    winston.warn(`Incorrect request object`);
    return res.sendStatus(400)
  }
}
