'use strict';
import redis from 'redis';
import config from '../../config/environment';

var redisClient = redis.createClient(config.redisConfig);
import uuid from 'node-uuid';
var debug = require('debug') ('authAPI:token.model');
const AUTH_HASH = 'authHash';

function createToken(body) {
  //generate token
  return new Promise(function (resolve, reject) {
    let token = uuid.v4();
    debug ('createToken', token);
    redisClient.hmset(AUTH_HASH, token, JSON.stringify(body), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
}

function checkToken(token) {
  return new Promise(function (resolve, reject) {
    redisClient.hget(AUTH_HASH, token, (err, reply) => {
      if (err) {
        reject(err);
      } else {
        try {
          var parsed = JSON.parse(reply);
          if (parsed.profileId && parsed.provider && parsed.id) {
            resolve(parsed);
          } else {
            reject();
          }
        } catch (err) {
          reject();
        }
      }
    });
  });
}

export default {
  save: createToken,
  findById: checkToken
}
