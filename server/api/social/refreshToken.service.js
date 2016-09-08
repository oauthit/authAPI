'use strict';

import config from '../../config/environment';
var debug = require('debug')('authAPI:refreshToken');
import FB from 'fb';
import ProviderToken from '../../models/providerToken.model.js';

export default function (provider, profileId) {
  return new Promise((resolve, reject) => {

    ProviderToken.findByProfileId(provider, profileId)
      .then((providerToken) => {

        var accessToken = providerToken.accessToken;

        if (provider === 'facebook') {
          FB.api('oauth/access_token', {
            client_id: config.facebook.clientID,
            client_secret: config.facebook.clientSecret,
            grant_type: 'fb_exchange_token',
            fb_exchange_token: accessToken
          }, function (res) {
            if (!res || res.error) {
              reject(res.error);
            }

            ProviderToken.createToken(provider, profileId, accessToken, res.access_token).then(function () {
              resolve(res);
            });
          });
        } else {
          throw new Error('Invalid provider');
        }

      })
      .catch((err) => {
        return reject(err);
      });
  });
}
