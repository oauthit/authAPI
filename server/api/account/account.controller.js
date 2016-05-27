'use strict';

import stapiAccount from './../../models/account.model.js';
import abstractController from '../abstract/abstract.stapi.controller';
import Account from '../../models/js-data/account.model';

let ctrl = abstractController(stapiAccount);

function setReq(req) {
  if (!req.params) {
    req.params = {};
  }
  req.params.id = req.user && req.user.id || 0;
  return req;
}

ctrl.index = function (req, res) {

  Account.findAll().then(data => {
    //console.log(data);
    return res.json(data);
  }).catch(err => {
    console.log(err);
  });
};

ctrl.showMe = function (req, res) {
  ctrl.show(setReq(req), res);
};

ctrl.updateMe = function (req, res) {
  ctrl.update(setReq(req), res);

};

ctrl.create = function (req, res) {
  Account.create(req.body)
    .then(account => {
      console.log('Account', account);
      // return status 204 created
      return res.sendStatus(204).json(account);
    })
    .catch(err => {
      console.log(err);
      return res.sendStatus(500);
    })
  ;
};

export default ctrl;
