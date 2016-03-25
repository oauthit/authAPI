'use strict';
import redisWrapper from '../../config/redis';
import socialAccount from './socialAccount.model';
var SocialAccount = socialAccount();
import q from 'Q';

function saveProfile(tableName) {
  return (profileId, data) => {
    let acc = {
      provider: data.provider,
      profileId: profileId,
      name: data.name
    };
    return q.all([SocialAccount.save(acc), redisWrapper.hsetAsync(tableName, profileId, data)]);
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
  return {
    save: saveProfile(tableName),
    getFromRedis: getProfile(tableName),
    getFromApi: getProfileFromApi(callback)
  };
}
