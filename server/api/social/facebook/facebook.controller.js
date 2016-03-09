
/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/agent              ->  index
 * POST    /api/agent              ->  create
 * GET     /api/agent/:id          ->  show
 * PUT     /api/agent/:id          ->  update
 * DELETE  /api/agent/:id          ->  destroy
 */

'use strict';

import config from '../../../config/environment';
import FB from 'fb';
var debug = require('debug')('authAPI:fb/index');
import refreshToken from './refreshToken';
import ProviderToken from '../../providerToken/providerToken.model';

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

    const PROFILE = req.user.provider+':'+req.user.profileId;
    ProviderToken.findByProfileId(PROFILE).then(function (res) {

      if (!res) {
        return onReject (response,401) ('No redis data');
      }

      FB.setAccessToken(res.accessToken);
      FB.api('me/friends?limit=10', function (res) {
        if(!res || res.error) {
          debug('api/fb GET', !res ? 'error occurred' : res.error);
          return;
        }

        return response.status(200).json(res.data);
      });

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

    const PROFILE = req.user.provider+':'+req.user.profileId;
    ProviderToken.findByProfileId(PROFILE).then(function (res) {

      FB.setAccessToken(res.accessToken);
      FB.api(req.params.id, function (res) {
        if (!res || res.error) {
          return response.status(400).end('Bad request');
        }

        return response.status(200).json(res);
      })

    },onReject (response));

  }

});

export default ctrl;
