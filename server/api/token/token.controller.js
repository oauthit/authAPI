'use strict';

import Token from '../../models/js-data/token.model';
import abstractController from '../abstract/abstract.jsdata.controller';

let ctrl = abstractController(Token);
let findOriginal = ctrl.find;

function checkToken() {

}

// Gets a single Token from the DB
ctrl.find = function find(req,res) {

  let token = req.params.id || req.headers.authorization;
  if (token) {
    req.params.id = token;
  }
  findOriginal(req,res);
};

export default ctrl;
