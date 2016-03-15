'use strict';
import redisWrapper from '../../../../config/redis';
import config from '../../../../config/environment';
import FB from 'fb';

function saveProfile(profileId, data) {
  return redisWrapper.hsetAsync(config.redisTables.FACEBOOK_PROFILE, profileId, data);
}

function getProfile(profileId) {
  return redisWrapper.hgetAsync(config.redisTables.FACEBOOK_PROFILE, profileId);
}

function getFacebookProfileFromFbApi(id, providerToken, profileId) {
  return new Promise(function (resolve, reject) {
    try {
      var parsed = JSON.parse(providerToken);
      FB.api(id, {access_token: parsed.accessToken}, function (res) {
        if (!res || res.error) {
          getProfile(profileId).then(function (reply) {
            try {
              return resolve(reply);
            } catch (err) {
              return reject(err);
            }
          });
        }

        saveProfile(res.id, res);
        resolve(res);
      });
    } catch (err) {
      return reject(err);
    }
  });
}


export default {
  save: saveProfile,
  getFromRedis: getProfile,
  getFromApi: getFacebookProfileFromFbApi
}
