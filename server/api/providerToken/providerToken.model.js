'use strict';
import redis from 'redis';
import config from '../../config/environment';

var redisClient = redis.createClient(config.redisConfig);

function createToken(profileId, accessToken, refreshToken) {
  //generate token

  return new Promise(function (resolve) {
    redisClient.hmset(profileId, 'accessToken', accessToken, 'refreshToken', refreshToken, (reply) => {
      resolve(reply);
    });
  });
}

function checkToken(profileId) {
  return new Promise(function (resolve, reject) {
    redisClient.hgetall(profileId, (err, reply) => {
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
