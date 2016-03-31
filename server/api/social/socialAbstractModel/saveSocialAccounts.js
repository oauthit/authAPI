'use strict';

import async from 'async';
import _ from 'lodash';
var debug = require('debug')('authAPI:socialAbstractModel/find');
import q from 'Q';
import socialFriendSTAPI from './../socialFriendSTAPI/socialFriendSTAPI.model.js';

export default function saveSocialAccounts(req, modelName, friendModel, profileModel) {
  return function (resolve, reject, res, profileId) {
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
          }).catch((err) => {
            debug(err);
            reject(err);
          });
        }, (err, results) => {
          if (err) return reject(err);
          friendsProfiles = results;
        });

        return resolve(friendsProfiles);

      }).catch((err) => {
        debug(err);
        reject(err);
      });
    } else {

      let profileIds = _.map(res.data, 'id');

      friendModel.saveAll(profileId, profileIds).then(() => {

        let promiseQueue = _.map(res.data, function (profile) {
          return profileModel(req).save(profile.id, modelName, profile);
        });

        return q.all(promiseQueue).then(() => {
          //saving social friend into STAPI
          let socialFriendPromiseQueue = _.map(res.data, (profile) => {
            let socialFriend = {
              provider: modelName,
              ownerProfileId: profileId,
              friendProfileId: profile.id
            };
            debug('socialFriend', socialFriend);
            return socialFriendSTAPI(req).save(socialFriend);
          });

          return q.all(socialFriendPromiseQueue).then(() => {
            return resolve(res.data);
          }).catch((err) => {
            debug(err);
            reject(err);
          });

        }).catch((err) => {
          debug(err);
          reject(err);
        });

      }).catch((err) => {
        debug('friendModel.saveAll error', err);
        reject();
      });

    }
  };
}
