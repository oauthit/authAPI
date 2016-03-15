'use strict';

import FB from 'fb';
import config from '../../config/environment';
import async from 'async';
import _ from 'lodash';
var debug = require('debug')('authAPI:socialAbstract.model');

FB.options({
  appId: config.facebook.clientID,
  appSecret: config.facebook.clientSecret
});

function model(modelName, FriendModel, ProfileModel) {

  return function (req) {

    function find() {
      let profileId = req.user.profileId;

      function callback(resolve, reject, res) {
        if (!res || res.error) {
          //if fb not returning data get it from redis
          FriendModel.getAll(profileId).then(function (reply) {
            if (!reply) {
              return reject(404);
            }

            var friendsProfiles = [];
            async.map(reply, (profileId, cb) => {
              ProfileModel.getFromRedis(profileId).then((profile) => {
                if (profile) {
                  cb(null, profile)
                }
              });
            }, (err, results) => {
              friendsProfiles = results;
            });

            return resolve(friendsProfiles);

          });
        } else {
          let profileIds = _.map(res.data, 'id');
          FriendModel.saveAll(profileId, JSON.stringify(profileIds));
          _.each(res.data, function (profile) {
            ProfileModel.save(profile.id, JSON.stringify(profile));
          });
          return resolve(res.data);
        }
      }

      return new Promise(function (resolve, reject) {
        try {
          var parsed = JSON.parse(req.providerToken);
          if (modelName === 'facebook') {
            FB.api('me/friends', {access_token: parsed.accessToken, limit: 10}, (res) => {
              return callback(resolve, reject, res);
            });
          } else {
            throw new Error('No such model name');
          }
        } catch (err) {
          return reject(err);
        }
      });

    }

    function getFromApi(resolve, reject) {
      return function (id, providerToken, profileId) {
        ProfileModel.getFromApi(id, providerToken, profileId).then(function (res) {
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

        ProfileModel.getFromRedis(id).then(function (reply) {
          if (!reply) {
            return getDataFromApi(id, providerToken, profileId);
          }

          try {
            return resolve(JSON.parse(reply));
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
