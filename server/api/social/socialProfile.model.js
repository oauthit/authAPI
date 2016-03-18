'use strict';
import redisWrapper from '../../config/redis';

function saveProfile(tableName) {
  return (profileId, data) => {
    return redisWrapper.hsetAsync(tableName, profileId, data);
  }
}

function getProfile(tableName) {
  return (profileId) => {
    return redisWrapper.hgetAsync(tableName, profileId);
  }
}

function getFacebookProfileFromFbApi(cb) {
  return cb;
}

export default (tableName, callback) => {
  return {
    save: saveProfile(tableName),
    getFromRedis: getProfile(tableName),
    getFromApi: getFacebookProfileFromFbApi(callback)
  };
}
