'use strict';
import redisWrapper from '../config/redis';
import config from '../config/environment';

var redisClient = redisWrapper.redisClient;

function createToken(provider, profileId, accessToken, refreshToken) {
  //generate token
  var providerToken = {
    accessToken: accessToken,
    refreshToken: refreshToken
  };

  return new Promise(function (resolve) {
    redisClient.hmset(config.redisTables.PROVIDER_TOKEN+':'+provider, profileId, JSON.stringify(providerToken), (reply) => {
      resolve(reply);
    });
  });
}

function checkToken(provider, profileId) {
  return new Promise(function (resolve, reject) {
    redisClient.hget(config.redisTables.PROVIDER_TOKEN+':'+provider, profileId, (err, reply) => {
      if (err) {
        reject();
      }
      resolve(reply);
    });
  });
}

export default {
  save: createToken,
  findByProfileId: checkToken
}
