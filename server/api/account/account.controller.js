/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/providerAccount              ->  index
 * POST    /api/providerAccount              ->  create
 * GET     /api/providerAccount/:id          ->  show
 * PUT     /api/providerAccount/:id          ->  update
 * DELETE  /api/providerAccount/:id          ->  destroy
 */

'use strict';

import ProviderAccount from './account.model.js';
import abstractController from '../abstract/abstract.controller';

let ctrl = abstractController(ProviderAccount);

ctrl.showMe = function (req, res) {
  if (!req.params) {
    req.params = {}
  }
  req.params.id = req.user && req.user.id || 0;
  ctrl.show(req, res);
};

export default ctrl;
