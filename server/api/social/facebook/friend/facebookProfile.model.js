'use strict';
import redis from 'redis';
import config from '../../../../config/environment';
import bluebird from 'bluebird';
bluebird.promisifyAll(redis.RedisClient.prototype);

var redisClient = redis.createClient(config.redisConfig);

function saveProfile(profileId, data) {

  return redisClient.hsetAsync(config.redisTables.FACEBOOK_PROFILE, profileId, data);

}

function getProfile(profileId) {
  return redisClient.hgetAsync(config.redisTables.FACEBOOK_PROFILE, profileId);
}

export default {
  save: saveProfile,
  get: getProfile
}
