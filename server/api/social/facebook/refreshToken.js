'use strict';

import config from '../../../config/environment';
import redis from 'redis';
var debug = require('debug')('authAPI:refreshToken');
import FB from 'fb';
import ProviderToken from '../../providerToken/providerToken.model.js';
import bluebird from 'bluebird';
bluebird.promisifyAll(redis.RedisClient.prototype);

var redisClient = redis.createClient(config.redisConfig);

export default function (provider, profileId) {
  return new Promise ((resolve, reject) => {
    redisClient.hgetAsync(config.redisTables.PROVIDER_TOKEN+':'+provider, profileId).then(function (reply) {
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

        var providerToken = {
          accessToken: accessToken,
          refreshToken: res.accees_token
        };
        ProviderToken.save(config.redisTables.PROVIDER_TOKEN+':'+provider, profileId, JSON.stringify(providerToken)).then(function () {
          resolve(res);
        });

      });
    }, function () {
      console.log('no data');
      reject();
    });
  });

}
