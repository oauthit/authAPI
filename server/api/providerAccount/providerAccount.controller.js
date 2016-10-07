'use strict';

import providerAccount from './../../models/js-data/providerAccount.model';
import {jsDataBaseController} from 'sistemium-node';
var debug = require('debug')('authAPI:providerAccount.controller');

let ctrl = jsDataBaseController(providerAccount);

function setReq(req) {
  if (!req.params) {
    req.params = {};
  }
  req.params.id = req.user && req.user.id || 0;
  return req;
}

ctrl.showMe = function (req, res) {
  ctrl.find(setReq(req), res);
};

ctrl.updateMe = function (req, res) {
  ctrl.update(setReq(req), res);

};

ctrl.unlink = function (req, res) {
  let providerAccountId = req.params.id;
  let ProviderAccount = providerAccount(req);
  if (providerAccountId) {
    debug('unlink', providerAccountId);
    ProviderAccount.patch(providerAccountId, {accountId: null}).then(() => {
      return res.status(200).end();
    }).catch((err) => {
      return res.status(400).end(err);
    });
  }
};

export default ctrl;
