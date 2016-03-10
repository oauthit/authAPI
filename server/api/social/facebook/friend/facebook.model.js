'use strict';
import redis from 'redis';
import config from '../../../../config/environment';
import bluebird from 'bluebird';
bluebird.promisifyAll(redis.RedisClient.prototype);

var redisClient = redis.createClient(config.redisConfig);

function saveFriend(friendId, friend) {

  return redisClient.saddAsync(config.redisTables.FACEBOOK_FRIEND+':'+friendId, friend);

}

export default {
  save: saveFriend,
}
