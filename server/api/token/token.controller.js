'use strict';

import Token from '../../models/js-data/token.model';
import abstractController from '../abstract/abstract.jsdata.controller';

let ctrl = abstractController();
let showOriginal = ctrl.show;

function checkToken() {

}

// Gets a single Token from the DB
ctrl.show = function show(req,res) {
  let token = req.params.id || req.headers.authorization;
  if (token) {
    req.params.id = token;
  }
  showOriginal(req,res);
};

export default ctrl;
