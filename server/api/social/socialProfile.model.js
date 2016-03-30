'use strict';
import redisWrapper from '../../config/redis';
import socialAccount from './socialAccountSTAPI/socialAccountSTAPI.model';
import q from 'Q';
var debug = require('debug')('authAPI:socialProfile.model');

function saveProfile(req, tableName) {
  return (profileId, provider, data) => {

    let acc = {
      provider: provider,
      profileId: profileId,
      name: data.name
    };
    let p = redisWrapper.hsetAsync(tableName, profileId, data);

    p.then((reply) => {
      if (reply === 1) {
        return socialAccount(req).getOrCreate({provider: acc.provider, profileId: acc.profileId}, acc);
      }
    });

    return p;
  }
}

function getProfile(tableName) {
  return (profileId) => {
    return redisWrapper.hgetAsync(tableName, profileId);
  }
}

function getProfileFromApi(cb) {
  return cb;
}

export default (tableName, callback) => {
  return function (req) {
    return {
      save: saveProfile(req, tableName),
      getFromRedis: getProfile(tableName),
      getFromApi: getProfileFromApi(callback)
    };
  }
}
