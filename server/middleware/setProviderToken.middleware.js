'use strict';
import ProviderToken from '../api/providerToken/providerToken.model';
import providerAccount from '../api/providerAccount/providerAccount.model';
let ProviderAccount = providerAccount();
var debug = require('debug')('authAPI:setProviderToken.middleware');

function onReject(response, status) {
  return function (err) {
    response.status(status || 500).end(err);
  }
}

export default function () {
  return function (req, res, next) {
    let id = req.user.id;
    //TODO pass provider account id from client

    debug('user.id', id);
    ProviderAccount.findById().then(function (data) {
      req.user.profileId = data.profileId;
      ProviderToken.findByProfileId(data.provider, data.profileId).then(function (providerToken) {
        if (!res) {
          return onReject(res, 401)('Unauthorized!');
        }

        debug(providerToken);
        req.providerToken = providerToken;
        next();
      }, onReject(res, 500));

    });

  }
}
