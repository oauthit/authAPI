/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/agent              ->  index
 * POST    /api/agent              ->  create
 * GET     /api/agent/:id          ->  show
 * PUT     /api/agent/:id          ->  update
 * DELETE  /api/agent/:id          ->  destroy
 */

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

function getFacebookProfileFromFbApi(req, response, providerToken, profileId) {
  try {
    var parsed = JSON.parse(providerToken);

    // TODO do not set access access token globally
    FB.setAccessToken(parsed.accessToken);
    FB.api(req.params.id, function (res) {
      if (!res || res.error) {
        FacebookProfile.get(profileId).then(function (reply) {
          try {
            return response.status(200).json(JSON.parse(reply));
          } catch (err) {
            return onReject(response)(err);
          }
        });
      }

      FacebookProfile.save(res.id, JSON.stringify(res));
      return response.status(200).json(res);
    });
  } catch (err) {
    return onReject(response)(err);
  }
}

Object.assign(ctrl, {

  get: (req, response) => {
    //get access token by profile id
    if (!req.user) {
      return onReject(response, 401)('Unauthorized');
    }

    let profileId = req.user.profileId;
    let provider = req.user.provider;

    ProviderToken.findByProfileId(provider, profileId).then(function (res) {

      if (!res) {
        return onReject(response, 401)('No redis data');
      }

      try {
        var parsed = JSON.parse(res);
        FB.setAccessToken(parsed.accessToken);
        FB.api('me/friends?limit=10', function (res) {
          if (!res || res.error) {
            debug('api/fb GET', !res ? 'error occurred' : res.error);

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

    }, onReject(response));

  },

  refreshToken: (req, response) => {

    if (!req.user) {
      return response.end('Unauthorized!');
    }

    refreshToken(req.user.provider, req.user.profileId).then(function () {
      response.end();
    }, function () {
      response.end();
    });

  },

  getById: (req, response) => {
    if (!req.user) {
      return response.end('Unauthorized!');
    }

    let profileId = req.user.profileId;
    ProviderToken.findByProfileId(req.user.provider, profileId).then(function (providerToken) {

      FacebookProfile.get(profileId).then(function (reply) {
        if (!reply) {
          return getFacebookProfileFromFbApi(req, response, providerToken, profileId);
        }

        try {
          return response.status(200).json(JSON.parse(reply));
        } catch (err) {
          return onReject(response)(err);
        }
      }, function () {
        getFacebookProfileFromFbApi(req, response, providerToken, profileId);
      });

    }, onReject(response));

  }

});

export default ctrl;
