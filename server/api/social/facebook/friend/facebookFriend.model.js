'use strict';
import redisWrapper from '../../../../config/redis';
import config from '../../../../config/environment';


function saveFriends(profileId, data) {
  return redisWrapper.hsetAsync(config.redisTables.FACEBOOK_FRIEND, profileId, data);
}

function getFriends(profileId) {
  return redisWrapper.hgetAsync(config.redisTables.FACEBOOK_FRIEND, profileId);
}

export default {
  saveAll: saveFriends,
  getAll: getFriends
}
