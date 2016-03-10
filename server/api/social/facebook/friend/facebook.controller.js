
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
import FacebookFriend from './facebook.model';
import _ from 'lodash';

let ctrl = {};

FB.options({
  appId: config.facebook.clientID,
  appSecret: config.facebook.clientSecret
});

function onReject (response, status) {
  return function (err) {
    debug('onReject:', err);
    response.status(status || 500).end(err);
  }
}

Object.assign(ctrl, {

  get: (req, response) => {
    //get access token by profile id
    if (!req.user) {
      return onReject (response,401) ('Unauthorized');
    }

    ProviderToken.findByProfileId(req.user.provider, req.user.profileId).then(function (res) {

      if (!res) {
        return onReject (response,401) ('No redis data');
      }

      try {
        var parsed = JSON.parse(res);
        FB.setAccessToken(parsed.accessToken);
        FB.api('me/friends?limit=10', function (res) {
          if(!res || res.error) {
            debug('api/fb GET', !res ? 'error occurred' : res.error);
            return;
          }

          _.each(res.data, function (friend) {
            FacebookFriend.save(friend.id, JSON.stringify(friend));
          });

          return response.status(200).json(res.data);
        });
      } catch (err) {
        return onReject (response) (err);
      }

    },onReject (response));

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

    ProviderToken.findByProfileId(req.user.provider, req.user.profileId).then(function (res) {

      try {
        var parsed = JSON.parse(res);
        FB.setAccessToken(parsed.accessToken);
        FB.api(req.params.id, function (res) {
          if (!res || res.error) {
            return response.status(400).end('Bad request');
          }

          return response.status(200).json(res);
        })
      } catch (err) {
        return onReject (response) (err);
      }

    },onReject (response));

  }

});

export default ctrl;
