'use strict';

import config from '../../../config/environment';
var debug = require('debug')('authAPI:refreshToken');
import FB from 'fb';
import ProviderToken from '../../../models/providerToken.model.js';
//import ProviderToken from '../../../models/js-data/providerToken.model';


export default function (provider, profileId) {
  return new Promise ((resolve, reject) => {

    redisClient.hgetAsync(config.redisTables.PROVIDER_TOKEN+':'+provider, profileId).then(function (reply) {

    //ProviderToken.find(profileId)
    //  .then((providerToken) => {

      //  var accessToken = providerToken.accessToken;
      //
      //
      //  if (provider === 'facebook') {
      //    FB.api('oauth/access_token', {
      //      client_id: config.facebook.clientID,
      //      client_secret: config.facebook.clientSecret,
      //      grant_type: 'fb_exchange_token',
      //      fb_exchange_token: accessToken
      //    }, function (res) {
      //      if(!res || res.error) {
      //        reject();
      //      }
      //
      //      var providerToken = {
      //        accessToken: accessToken,
      //        refreshToken: res.accees_token
      //      };
      //      ProviderToken.save(config.redisTables.PROVIDER_TOKEN+':'+provider, profileId, JSON.stringify(providerToken)).then(function () {
      //        resolve(res);
      //      });
      //    });
      //  } else {
      //    throw new Error('Invalid provider');
      //  }
      //
      //})
      //.catch((err) => {
      //  return reject(err);
      //});
      debug('accessToken/redis', reply);
      if (!reply) {
        debug('refreshToken', 'No such accessToken');
        return reject();
      }
      var accessToken = reply.accessToken;

      if (provider === 'facebook') {
        FB.api('oauth/access_token', {
          client_id: config.facebook.clientID,
          client_secret: config.facebook.clientSecret,
          grant_type: 'fb_exchange_token',
          fb_exchange_token: accessToken
        }, function (res) {
          if(!res || res.error) {
            reject();
          }

          var providerToken = {
            accessToken: accessToken,
            refreshToken: res.accees_token
          };
          ProviderToken.save(config.redisTables.PROVIDER_TOKEN+':'+provider, profileId, JSON.stringify(providerToken)).then(function () {
            resolve(res);
          });
        });
      } else {
        throw new Error('Invalid provider');
      }

    }, function () {
      console.log('no data');
      reject();
    });
  });

}
