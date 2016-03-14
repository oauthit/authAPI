'use strict';

import redis from 'redis';
import config from './environment';
import bluebird from 'bluebird';

bluebird.promisifyAll(redis.RedisClient.prototype);

var redisClient = redis.createClient(config.redisConfig);
var redisWrapper = {};

Object.assign(redisWrapper, {

  redisClient: redisClient,
  hsetAsync: function (hashName, key, value) {
    return redisClient.hsetAsync(hashName, key, value)
  },
  hgetAsync: function (hashName, key) {
    return redisClient.hgetAsync(hashName, key);
  }

});

export default redisWrapper;
