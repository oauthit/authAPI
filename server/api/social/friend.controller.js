'use strict';

import refreshToken from './refreshToken.service';
import socialFriend from '../../models/socialFriend.model';
import socialAccount from '../../models/socialAccount.model';
import {stapiBaseController} from 'sistemium-node';
import providerAccount from '../../models/providerAccount/providerAccount.model';
import providerApp from '../../models/providerApp.model';
import FB from 'fb';
import googleapis from 'googleapis';
import VKApi from 'node-vkapi';

let ctrl = stapiBaseController(socialFriend);

Object.assign(ctrl, {

  refreshToken: (req, response) => {

    refreshToken(req.user.provider, req.user.profileId).then(function () {
      response.end();
    }, function () {
      response.end();
    });

  }

});

ctrl.index = function (req, res) {

  function fetchSocialFriends(providerAppsWithAccounts) {

    let result = {
      fb: [],
      google: []
    };

    return new Promise((resolve, reject) => {

      let promises = providerAppsWithAccounts.map((pa) => {

        let providerApp = pa[0];
        let providerAccount = pa[1];

        return new Promise((resolve, reject) => {
          switch (providerApp.provider) {
            case 'facebook':
              FB.options({
                appId: providerApp.clientId,
                appSecret: providerApp.clientSecret
              });

              FB.api('me/friends', {access_token: providerAccount.accessToken, limit: 10}, (res) => {
                result.fb.push(res);
                resolve();

                //TODO save socialFriend
              });
              break;

            case 'google':
              let googleOAuth2Client = new googleapis.auth.OAuth2(providerApp.clientId, providerApp.clientSecret);
              googleOAuth2Client.setCredentials({
                access_token: providerAccount.accessToken,
                refresh_token: providerAccount.refreshToken
              });
              googleOAuth2Client.refreshAccessToken(err => {
                if (err) return reject(err);

                googleapis.plus('v1').people.list({
                  userId: 'me',
                  collection: 'visible',
                  auth: googleOAuth2Client
                }, (err, reply) => {
                  if (err) {
                    return reject(err);
                  }

                  result.google.push(reply);
                  resolve();
                });

              });

              break;

            case 'twitter':
              //TODO get twitter followers
              resolve();

              break;

            case 'vk':
              //TODO get vk friends list
              // const VK = new VKApi({
              //   app: {
              //     id: providerApp.clientId,
              //     secret: providerApp.clientSecret
              //   },
              //   token: providerAccount.accessToken
              // });
              //
              // VK.call('friends.get').then(vkFriends => {
              //   console.log(vkFriends);
              // }).catch(err => {
              //   console.error(err);
              // });
              //

              resolve();

              break;

            default:
              throw new Error(`No such provider '${providerApp.provider}'`);

          }
        });

      });

      Promise.all(promises).then(_ => {
        return resolve(result);
      }).catch(err => {
        return reject(err);
      });

    });

  }

  providerAccount(req).find({accountId: req.user.id})
    .then(providerAccounts => {

      let socialAccountPromises = providerAccounts.map(pa => {
        return Promise.all([
          socialAccount(req).findById(pa.socialAccountId),
          providerApp(req).findById(pa.providerAppId),
          pa
        ]);
      });

      Promise.all(socialAccountPromises)
        .then(data => {
          let socialAccounts = data.map(i => i[0]);
          let providerAppsWithAccounts = data.map(i => [i[1], i[2]]);

          fetchSocialFriends(providerAppsWithAccounts).then(socialFriends => {
            console.log(socialFriends);
          }).catch(err => {
            console.error(err);
          });

          let socialFriendPromises = socialAccounts.map(sa => {
            return socialFriend(req).find({ownerSocialAccountId: sa.id});
          });

          Promise.all(socialFriendPromises)
            .then((socialFriends => {
              return res.json(socialFriends);
            }));
        });
    })
    .catch(err => {
      console.log(err);
    })
  ;

};

export default ctrl;
