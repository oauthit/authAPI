'use strict';
import ProviderToken from '../api/providerToken/providerToken.model';
import providerAccount from '../api/providerAccount/providerAccount.model';
let ProviderAccount = providerAccount();

function onReject(response, status) {
  return function (err) {
    response.status(status || 500).end(err);
  }
}

export default function () {
  return function (req, res, next) {
    let id = req.user.id;

    ProviderAccount.findOne({accountId: id}).then(function (data) {
      req.user.profileId = data.profileId;
      ProviderToken.findByProfileId(data.provider, data.profileId).then(function (providerToken) {
        if (!res) {
          return onReject(res, 401)('Unauthorized!');
        }

        req.providerToken = providerToken;
        next();
      }, onReject(res, 500));

    });
  }
}
