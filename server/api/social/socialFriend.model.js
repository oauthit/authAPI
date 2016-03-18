'use strict';
import redisWrapper from '../../config/redis';

function saveFriends(tableName) {
  return function (profileId, data) {
    return redisWrapper.hsetAsync(tableName, profileId, data);
  }
}

function getFriends(tableName) {
  return (profileId) => {
    return redisWrapper.hgetAsync(tableName, profileId);
  };
}

export default (tableName) => {
  return {
    saveAll: saveFriends(tableName),
    getAll: getFriends(tableName)
  };
}
