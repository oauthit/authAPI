'use strict';

import stapiAccount from './../../models/account.model.js';
import sistemium from 'sistemium-node';
import Account from '../../models/js-data/account.model';
var debug = require('debug')('authAPI:api:account:controller');

let abstractController = sistemium.stapiAbstractController;
let ctrl = abstractController(stapiAccount);

function setReq(req) {
  if (!req.params) {
    req.params = {};
  }
  req.params.id = req.user && req.user.id || 0;
  debug('setReq user:', req.user);
  return req;
}

ctrl.index = function (req, res) {

  Account.findAll().then(data => {
    return res.json(data);
  }).catch(err => {
    console.error(err);
  });

};

ctrl.showMe = function (req, res) {
  req = setReq(req);
  req.params.id = req.user.tokenInfo.id;
  ctrl.show(req, res);
};

ctrl.updateMe = function (req, res) {
  ctrl.update(setReq(req), res);
};

ctrl.create = function (req, res) {
  Account.create(req.body)
    .then(account => {
      debug('create Account:', account);
      // return status 204 created
      return res.sendStatus(204).json(account);
    })
    .catch(err => {
      console.error(err);
      return res.sendStatus(500);
    })
  ;
};

export default ctrl;
