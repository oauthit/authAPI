/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/token              ->  index
 * POST    /api/token              ->  create
 * GET     /api/token/:id          ->  show
 * PUT     /api/token/:id          ->  update
 * DELETE  /api/token/:id          ->  destroy
 */

'use strict';

import Token from './token.model';
import abstractController from '../abstract/abstract.controller';

let ctrl = abstractController(Token);
let showOriginal = ctrl.show;

// Gets a single Token from the DB
ctrl.show = function show(req,res) {
  let token = req.params.id || req.headers.authorization;
  if (token) {
    req.params.id = token;
  }
  showOriginal(req,res);
};

export default ctrl;
