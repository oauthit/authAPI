'use strict';

import providerAccount from '../../models/providerAccount/providerAccount.model';
import providerApp from '../../models/providerApp.model';
import socialAccount from '../../models/socialAccount.model';
import socialFriend from '../../models/socialFriend.model';

import _ from 'lodash';

function saveSocialAccount(req, socialAcc) {

  function checkIfExistAndSave(sAcc) {
    return socialAccount(req).findOne({profileId: sAcc.profileId})
      .then(reply => {
        if (reply) {
          return reply;
        } else {

          return socialAccount(req)
            .save(sAcc)
            .then(reply => {
              // saveSocialFriend(req, reply, sAcc.ownerSocialAccount)
              //   .then(() => {
              return reply;
              // });
            })
            .catch(err => {
              console.error(err);
            })
            ;

        }

      })
      .catch(err => {
        console.error(err);
      });
  }

  if (Array.isArray(socialAcc)) {

    let promises = _.map(socialAcc, checkIfExistAndSave);
    return Promise.all(promises)
      .then(reply => {
        return reply;
      })
      .catch(err => {
        console.error(err);
      });

  } else {
    return checkIfExistAndSave(socialAcc)
      .then(reply => {
        return reply;
      });
  }
}

function saveSocialFriend(req, socialAccount, ownerSocialAccount) {
  return socialFriend(req).save({
    ownerProfileId: ownerSocialAccount.profileId,
    friendProfileId: socialAccount.profileId,
    ownerSocialAccountId: ownerSocialAccount.id,
    friendSocialAccountId: socialAccount.id
  }).then(socialFriend => {
    return socialFriend;
  })
    .catch(err => {
      console.error(err);
    });
}

export function getSocialFriends(fetch, parse, provider) {
  return function (req, res) {
    providerAccount(req).find({accountId: req.user.id})
      .then(providerAccounts => {
        providerAccounts = providerAccounts.filter(pa => {
          return pa.profileData.provider === provider;
        });
        let promises = providerAccounts.map(pa => {
          return Promise.all([
            providerApp(req).findById(pa.providerAppId),
            pa
          ]);
        });

        Promise.all(promises)
          .then(data => {
            let promises = data.map(item => {
              return fetch(item[0], item[1]);
            });

            Promise.all(promises)
              .then(data => {
                let items = _.flatten(data.map(item => {
                  return parse(item);
                }));

                saveSocialAccount(req, items)
                  .then(reply => {
                    return res.json(reply);
                  })
                  .catch(err => {
                    console.error(err);
                    return res.end(err);
                  })
                ;

              })
              .catch(err => {
                console.error(err);
                return res.end(err);
              })
            ;

          })
          .catch(err => {
            console.error(err);
            return res.end(err);
          })
        ;

      })
      .catch(err => {
        console.error(err);
        return res.end(err);
      });
  };

}
