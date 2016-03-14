'use strict';
import ProviderToken from '../api/providerToken/providerToken.model';

function onReject(response, status) {
  return function (err) {
    response.status(status || 500).end(err);
  }
}

export default function () {
  return function (req, res, next) {
    let profileId = req.user.profileId;
    let provider = req.user.provider;
    ProviderToken.findByProfileId(provider, profileId).then(function (providerToken) {
      if (!res) {
        return onReject(res, 401) ('Unauthorized!');
      }

      req.providerToken = providerToken;
      next();
    }, onReject(res, 500));
  }
}
