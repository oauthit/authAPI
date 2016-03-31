'use strict';
import ProviderToken from '../api/providerToken/providerToken.model';
import providerAccount from '../api/providerAccount/providerAccount.model';
let ProviderAccount = providerAccount();
var debug = require('debug')('authAPI:setProviderToken.middleware');

export default function () {
  return function (req, res, next) {
    let id = req.user.id;
    ProviderAccount.find({accountId: id}).then((data) => {
      req.userProviderAccounts = data;
      next();
    }).catch((err) => {
      debug('error occurred while trying to set user provider accounts',  err);
      next(err);
    });

  }
}
