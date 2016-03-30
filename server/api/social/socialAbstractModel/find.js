'use strict';
import FB from 'fb';
import googleapis from 'googleapis';
import config from '../../../config/environment';
import async from 'async';
import _ from 'lodash';
var debug = require('debug')('authAPI:socialAbstract.model');
var plus = googleapis.plus('v1');
var OAuth2 = googleapis.auth.OAuth2;
var oauth2Client = new OAuth2(config.google.clientID, config.google.clientSecret, config.google.callbackURL);
import q from 'Q';
import socialFriendSTAPI from './../socialFriendSTAPI/socialFriendSTAPI.model.js';

FB.options({
  appId: config.facebook.clientID,
  appSecret: config.facebook.clientSecret
});

export default function find(req, modelName, friendModel, profileModel) {
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
            debug('before resolve');
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
