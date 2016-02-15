/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/account              ->  index
 * POST    /api/account              ->  create
 * GET     /api/account/:id          ->  show
 * PUT     /api/account/:id          ->  update
 * DELETE  /api/account/:id          ->  destroy
 */

'use strict';

import Account from './account.model.js';
import abstractController from '../abstract/abstract.controller';

let ctrl = abstractController(Account);

ctrl.showMe = function (req, res) {
  if (!req.params) {
    req.params = {}
  }
  req.params.id = req.user && req.user.id || 0;
  ctrl.show(req, res);
};

export default ctrl;
