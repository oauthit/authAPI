'use strict';

import FB from 'fb';
import googleapis from 'googleapis';
import config from '../../config/environment';
import async from 'async';
import _ from 'lodash';
var debug = require('debug')('authAPI:socialAbstract.model');
var plus = googleapis.plus('v1');
var OAuth2 = googleapis.auth.OAuth2;
var oauth2Client = new OAuth2(config.google.clientID, config.google.clientSecret, config.google.callbackURL);
import q from 'Q';

FB.options({
  appId: config.facebook.clientID,
  appSecret: config.facebook.clientSecret
});

function model(modelName, friendModel, profileModel) {

  return function (req) {

    function find() {
      let profileId = req.user.profileId;

      function callback(resolve, reject, res) {
        debug('callback res', res);
        if (!res || res.error) {
          //if fb not returning data get it from redis
          friendModel.getAll(profileId).then(function (reply) {
            debug('friendModel', reply);
            if (!reply) {
              return reject(404);
            }

            var friendsProfiles = [];
            async.map(reply, (profileId, cb) => {
              profileModel().getFromRedis(profileId).then((profile) => {

                if (profile) {
                  cb(null, profile)
                }
              });
            }, (err, results) => {
              if (err) return reject(err);
              friendsProfiles = results;
            });

            return resolve(friendsProfiles);

          });
        } else {
          let profileIds = _.map(res.data, 'id');
          friendModel.saveAll(profileId, profileIds);
          let promiseQueue = [];
          _.each(res.data, function (profile) {
            promiseQueue.push(profileModel(req).save(profile.id, modelName, profile));
          });

          q.all(promiseQueue).then(() => {
            return resolve(res.data);
          });
        }
      }

      return new Promise(function (resolve, reject) {
        try {
          var parsed = JSON.parse(req.providerToken);
          debug('parsed', parsed);
          if (modelName === 'facebook') {
            FB.api('me/friends', {access_token: parsed.accessToken, limit: 10}, (res) => {
              return callback(resolve, reject, res);
            });
          } else if (modelName === 'google') {
            //TODO google friends
            oauth2Client.setCredentials({
              access_token: parsed.accessToken,
              refresh_token: parsed.refreshToken
            });
            plus.people.list({userId: 'me', collection: 'connected', auth: oauth2Client}, (err, response) => {
              if (err) {
                debug('error', err);
              }

              debug('response', response);
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

    function getFromApi(resolve, reject) {
      return function (id, providerToken, profileId) {
        try {
          providerToken = JSON.parse(providerToken);
        }
        catch (err) {
          debug('getFromApi', `Error occurred while parsing... Error message ${err}`);
          reject(err);
        }
        profileModel().getFromApi(id, providerToken.accessToken, profileId).then(function (res) {
          return resolve(res);
        }, function (err) {
          return reject(err);
        });
      }
    }


    function findById(id) {
      return new Promise(function (resolve, reject) {
        let profileId = req.user.profileId;
        let providerToken = req.providerToken;
        let getDataFromApi = getFromApi(resolve, reject);

        profileModel().getFromRedis(id).then(function (reply) {
          if (!reply) {
            return getDataFromApi(id, providerToken, profileId);
          }

          try {
            return resolve(reply);
          } catch (err) {
            return reject(err);
          }
        }, function () {
          return getDataFromApi(id, providerToken, profileId);
        });
      });
    }

    return {
      find: find,
      findById: findById
    };

  }

}

export default model;
