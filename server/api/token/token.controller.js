'use strict';

import Token from '../../models/js-data/token.model';
import {jsDataBaseController} from 'sistemium-node';

let ctrl = jsDataBaseController(Token);
let findOriginal = ctrl.find;

// Gets a single Token from the DB
ctrl.find = function find(req,res) {

  let token = req.params.id || req.headers.authorization;
  if (token) {
    req.params.id = token;
  }
  findOriginal(req,res);
};

export default ctrl;
