'use strict';

import config from '../../../../config/environment';
import FB from 'fb';
var debug = require('debug')('authAPI:fb/index');
import refreshToken from './../refreshToken';
import ProviderToken from '../../../providerToken/providerToken.model.js';
import FacebookFriend from './facebookFriend.model';
import FacebookProfile from './facebookProfile.model';
import _ from 'lodash';

let ctrl = {};

FB.options({
  appId: config.facebook.clientID,
  appSecret: config.facebook.clientSecret
});

function onReject(response, status) {
  return function (err) {
    debug('onReject:', err);
    response.status(status || 500).end(err);
  }
}

function getFromFbApi(id, response, providerToken, profileId) {
  FacebookProfile.getFromFbApi(id, providerToken, profileId).then(function (res) {
    return response.status(200).json(res);
  }, function (err) {
    return onReject(response, 500)(err);
  });
}

Object.assign(ctrl, {

  get: (req, response) => {
    //get access token by profile id
    if (!req.user) {
      return onReject(response, 401)('Unauthorized');
    }

    let profileId = req.user.profileId;

    try {
      var parsed = JSON.parse(req.providerToken);
      FB.api('me/friends', {access_token: parsed.accessToken, limit: 10}, function (res) {
        if (!res || res.error) {
          //if fb not returning data get it from redis
          FacebookFriend.getAll(profileId).then(function (reply) {
            if (!reply) {
              return response.status(404).end('No data');
            }

            try {
              return response.status(200).json(JSON.parse(reply));
            } catch (err) {
              return onReject(response)(err);
            }

          });
        }

        FacebookFriend.saveAll(profileId, JSON.stringify(res.data));
        _.each(res.data, function (profile) {
          FacebookProfile.save(profile.id, JSON.stringify(profile));
        });

        return response.status(200).json(res.data);
      });
    } catch (err) {
      return onReject(response)(err);
    }

  },

  refreshToken: (req, response) => {

    refreshToken(req.user.provider, req.user.profileId).then(function () {
      response.end();
    }, function () {
      response.end();
    });

  },

  getById: (req, response) => {

    let profileId = req.user.profileId;
    let id = req.params.id;
    let providerToken = req.providerToken;

    /**
     * Looks for facebook profile in redis, returns promise, if resolved, returns facebook profile
     */
    FacebookProfile.getFromRedis(id).then(function (reply) {
      if (!reply) {
        return getFromFbApi(id, response, providerToken, profileId);
      }

      try {
        return response.status(200).json(JSON.parse(reply));
      } catch (err) {
        return onReject(response)(err);
      }
    }, function () {
      return getFromFbApi(id, response, providerToken, profileId);
    });

  }

});

export default ctrl;
