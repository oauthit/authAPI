'use strict';
import config from '../../../../config/environment';
import FB from 'fb';
import socialProfile from '../../socialProfile.model';

function getFacebookProfileFromFbApi(id, providerToken, profileId) {
  return new Promise(function (resolve, reject) {
    try {
      var parsed = JSON.parse(providerToken);
      FB.api(id, {access_token: parsed.accessToken}, function (res) {
        if (!res || res.error) {
          socialProfile(config.redisTables.FACEBOOK_PROFILE).getFromRedis(profileId).then(function (reply) {
            try {
              return resolve(reply);
            } catch (err) {
              return reject(err);
            }
          });
        }

        socialProfile(config.redisTables.FACEBOOK_PROFILE).save(res.id, res);
        resolve(res);
      });
    } catch (err) {
      return reject(err);
    }
  });
}


export default socialProfile(config.redisTables.FACEBOOK_PROFILE, getFacebookProfileFromFbApi)
