'use strict';

import FB from 'fb';
import googleapis from 'googleapis';
import config from '../../../config/environment';
import _ from 'lodash';
var debug = require('debug')('authAPI:socialAbstractModel/find');
var plus = googleapis.plus('v1');
var OAuth2 = googleapis.auth.OAuth2;
var oauth2Client = new OAuth2(config.google.clientID, config.google.clientSecret, config.google.callbackURL);
import saveSocialAccounts from './saveSocialAccounts';

FB.options({
  appId: config.facebook.clientID,
  appSecret: config.facebook.clientSecret
});

export default function find(req, modelName, friendModel, profileModel) {

  //TODO for multiple social network account also need to pass profile id
  function getUserProviderAccount(provider) {
    return _.find(req.userProviderAccounts, {'provider': provider});
  }

  return new Promise(function (resolve, reject) {
    try {
      let providerAccount;
      if (modelName === 'facebook') {
        providerAccount = getUserProviderAccount(modelName);
        if (!providerAccount) {
          return resolve([]);
        }
        FB.api('me/friends', {access_token: providerAccount.accessToken, limit: 10}, (res) => {
          return saveSocialAccounts(req, modelName, friendModel, profileModel)(resolve, reject, res, providerAccount.profileId);
        });
      } else if (modelName === 'google') {
        //TODO google friends
        providerAccount = getUserProviderAccount(modelName);
        //if no provider account supplied resolve with empty array
        if (!providerAccount) {
          return resolve([]);
        }
        debug('providerAccount', providerAccount);
        oauth2Client.setCredentials({
          access_token: providerAccount.accessToken,
          refresh_token: providerAccount.refreshToken
        });
        plus.people.list({userId: 'me', collection: 'visible', auth: oauth2Client}, (err, response) => {
          if (err) {
            debug('error', err);
            return reject(err);
          }

          debug('response', response);
          return resolve(response.items);
        });
      } else {
        debug('No such model name');
        return reject();
      }
    } catch (err) {
      debug('find catch', err);
      return reject();
    }
  });

}
