'use strict';
import redis from 'redis';
var redisClient = redis.createClient();
import uuid from 'node-uuid';
var debug = require('debug') ('authAPI:token.model');
const AUTH_HASH = 'authHash';

function createToken(body) {
  //generate token
  return new Promise(function (resolve, reject) {
    let token = uuid.v4();
    debug ('createToken', token);
    redisClient.hset(AUTH_HASH, token, JSON.stringify(body), (err) => {
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
        resolve(JSON.parse(reply));
      }
    });
  });
}

export default {
  save: createToken,
  findById: checkToken
}
