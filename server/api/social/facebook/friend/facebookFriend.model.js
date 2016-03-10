'use strict';
import redis from 'redis';
import config from '../../../../config/environment';
import bluebird from 'bluebird';
bluebird.promisifyAll(redis.RedisClient.prototype);

var redisClient = redis.createClient(config.redisConfig);

function saveFriends(profileId, data) {

  return redisClient.hsetAsync(config.redisTables.FACEBOOK_FRIEND, profileId, data);

}

function getFriends(profileId) {
  return redisClient.hgetAsync(config.redisTables.FACEBOOK_FRIEND, profileId);
}

export default {
  saveAll: saveFriends,
  getAll: getFriends
}
