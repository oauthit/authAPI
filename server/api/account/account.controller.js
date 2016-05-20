'use strict';

import Account from './../../models/account.model.js';
import abstractController from '../abstract/abstract.controller';
import store from '../../models/js-data/store';

let ctrl = abstractController(Account);

function setReq(req) {
  if (!req.params) {
    req.params = {};
  }
  req.params.id = req.user && req.user.id || 0;
  return req;
}

ctrl.show = function (req, res) {
  store.getMapper('account').find({}).then(data => {
    console.log(data);
    return res.json(data);
  });
};

ctrl.showMe = function (req, res) {
  ctrl.show(setReq(req), res);
};

ctrl.updateMe = function (req, res) {
  ctrl.update(setReq(req), res);

};

export default ctrl;
