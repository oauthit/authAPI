'use strict';
import redisWrapper from '../config/redis';
import config from '../config/environment';
const debug = require('debug')('AuthAPI:models/providerToken.model');

var redisClient = redisWrapper.redisClient;

function createToken(provider, profileId, accessToken, refreshToken) {
  //generate token
  var providerToken = {
    accessToken: accessToken,
    refreshToken: refreshToken
  };

  return new Promise(function (resolve) {
    debug(config.redisTables.PROVIDER_TOKEN+':'+provider, profileId, JSON.stringify(providerToken));
    redisClient.hmset(config.redisTables.PROVIDER_TOKEN+':'+provider, profileId, JSON.stringify(providerToken), (reply) => {
      resolve(reply);
    });
  });
}

function findByProfileId(provider, profileId) {
  return new Promise(function (resolve, reject) {
    redisClient.hget(config.redisTables.PROVIDER_TOKEN+':'+provider, profileId, (err, reply) => {
      if (err) {
        reject();
      }
      resolve(reply);
    });
  });
}

export default {createToken, findByProfileId};
