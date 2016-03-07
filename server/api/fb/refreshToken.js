'use strict';

import config from '../../config/environment';
import redis from 'redis';
var debug = require('debug')('authAPI:refreshToken');
import FB from 'fb';
import ProviderToken from '../../api/providerToken/providerToken.model';

var redisClient = redis.createClient(config.redisConfig);

export default function (provider, profileId) {
  const HASH_KEY = provider+':'+profileId;

  return new Promise ((resolve, reject) => {
    redisClient.hgetallAsync(HASH_KEY).then(function (reply) {
      debug('accessToken/redis', reply);
      if (!reply) {
        debug('refreshToken', 'No such accessToken');
        return reject();
      }
      var accessToken = reply.accessToken;

      FB.api('oauth/access_token', {
        client_id: config.facebook.clientID,
        client_secret: config.facebook.clientSecret,
        grant_type: 'fb_exchange_token',
        fb_exchange_token: accessToken
      }, function (res) {
        if(!res || res.error) {
          reject();
        }

        ProviderToken.save(HASH_KEY, accessToken, res.access_token).then(function () {
          resolve(res);
        });

      });
    });
  });

}
