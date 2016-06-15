'use strict';

import config from '../../../config/environment';
var debug = require('debug')('authAPI:refreshToken');
import FB from 'fb';
import ProviderToken from '../../../models/providerToken.model.js';


export default function (provider, profileId) {
  return new Promise((resolve, reject) => {

    ProviderToken.findByProfileId(provider, profileId)
      .then((reply) => {

        debug('accessToken/redis', reply);
        if (!reply) {
          debug('refreshToken', 'No such accessToken');
          return reject();
        }
        var accessToken = reply.accessToken;

        if (provider === 'facebook') {
          FB.api('oauth/access_token', {
            client_id: config.facebook.clientID,
            client_secret: config.facebook.clientSecret,
            grant_type: 'fb_exchange_token',
            fb_exchange_token: accessToken
          }, function (res) {
            if (!res || res.error) {
              reject();
            }

            var providerToken = {
              accessToken: accessToken,
              refreshToken: res.accees_token
            };
            ProviderToken.createToken(provider, profileId, providerToken.accessToken, providerToken.refreshToken)
              .then(() => {
                resolve(res);
              })
              .catch((err) => {
                reject(err);
              });
          });
        } else {
          throw new Error('Invalid provider');
        }

      }, () => {
        console.log('no data');
        reject();
      })
      .catch(err => {
        reject(err);
      });
  });

}
