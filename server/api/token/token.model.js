'use strict';
import redisWrapper from '../../config/redis';
import config from '../../config/environment';
var redisClient = redisWrapper.redisClient;

import uuid from 'node-uuid';
var debug = require('debug') ('authAPI:token.model');

function createToken(body) {
  //generate token
  return new Promise(function (resolve, reject) {
    let token = uuid.v4();
    debug ('createToken', token);
    redisClient.hmset(config.redisTables.AUTH_TOKEN, token, JSON.stringify(body), (err) => {
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
    redisClient.hget(config.redisTables.AUTH_TOKEN, token, (err, reply) => {
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
