'use strict';
import config from '../../../../config/environment';
import socialProfile from '../../socialProfile.model';
var debug = require('debug')('authAPI:facebookProfile.model.js');
import googleapis from 'googleapis';
var plus = googleapis.plus('v1');
var OAuth2 = googleapis.auth.OAuth2;
var oauth2Client = new OAuth2(config.google.clientID, config.google.clientSecret, config.google.callbackURL);

function getGoogleProfileFromApi(id, accessToken, profileId) {
  return new Promise(function (resolve, reject) {
    oauth2Client.setCredentials({
      access_token: accessToken
    });
    plus.people.get({userId: 'me', auth: oauth2Client}, (err, response) => {
      if (err) {
        debug('error', err);
        reject(err);
      }

      debug('response', response);
      resolve(response);
    })
  });
}


export default socialProfile(config.redisTables.GOOGLE_PROFILE, getGoogleProfileFromApi)
