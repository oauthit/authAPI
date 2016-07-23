'use strict';

import providerAccount from '../models/providerAccount/providerAccount.model.js';
let ProviderAccount = providerAccount();

export default function () {
  return function (req, res, next) {

    let id = req.user.id;

    ProviderAccount.find({accountId: id}).then((data) => {
      req.userProviderAccounts = data;
      next();
    })
      .catch(next);

  };
}
