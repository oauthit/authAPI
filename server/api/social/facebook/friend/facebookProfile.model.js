'use strict';
import redisWrapper from '../../../../config/redis';
import config from '../../../../config/environment';

function saveProfile(profileId, data) {
  return redisWrapper.hsetAsync(config.redisTables.FACEBOOK_PROFILE, profileId, data);
}

function getProfile(profileId) {
  return redisWrapper.hgetAsync(config.redisTables.FACEBOOK_PROFILE, profileId);
}

export default {
  save: saveProfile,
  get: getProfile
}
