'use strict';
import redisWrapper from '../../../../config/redis';
import config from '../../../../config/environment';


function saveFriends(profileId, data) {
  return redisWrapper.hsetAsync(config.redisTables.FACEBOOK_FRIEND, profileId, JSON.stringify(data));
}

function getFriends(profileId) {
  return redisWrapper.hgetAsync(config.redisTables.FACEBOOK_FRIEND, profileId)
    .then((res) => {
      console.log('getFriends',res);
      return JSON.parse(res);
    });
}

export default {
  saveAll: saveFriends,
  getAll: getFriends
}
