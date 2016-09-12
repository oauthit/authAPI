'use strict';

import providerAccount from '../../models/providerAccount/providerAccount.model';
import providerApp from '../../models/providerApp.model';

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
                let items = data.map(item => {
                  return parse(item);
                });
                return res.json(items);
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
