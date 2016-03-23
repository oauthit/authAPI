'use strict';
import config from '../../../../config/environment';
import FB from 'fb';
import socialProfile from '../../socialProfile.model';
var debug = require('debug')('authAPI:facebookProfile.model.js');

function getFacebookProfileFromFbApi(id, accessToken, profileId) {
  return new Promise(function (resolve, reject) {

    FB.api(id, {access_token: accessToken}, function (res) {
      if (!res || res.error) {
        socialProfile(config.redisTables.FACEBOOK_PROFILE).getFromRedis(profileId).then(function (reply) {
          resolve(reply);
        }, (err) => {
          debug('getFacebookProfileFromFbApi', err);
          reject(err);
        });
        return;
      }

      socialProfile(config.redisTables.FACEBOOK_PROFILE).save(res.id, res);
      resolve(res);
    });
  });
}


export default socialProfile(config.redisTables.FACEBOOK_PROFILE, getFacebookProfileFromFbApi)
