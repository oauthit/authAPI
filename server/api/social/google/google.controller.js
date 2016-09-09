'use strict';

import {stapiBaseController} from 'sistemium-node';
import socialAccount from '../../../models/socialAccount.model';
import providerAccount from '../../../models/providerAccount/providerAccount.model';
import providerApp from '../../../models/providerApp.model';
import fetch from './fetch';
import parse from './parse';

let ctrl = stapiBaseController(socialAccount);

ctrl.index = function (req, res) {
  providerAccount(req).find({accountId: req.user.id, provider: 'google'})
    .then(providerAccounts => {
      let promises = providerAccounts.map(pa => {
        return Promise.all([
          providerApp(req).findById(pa.providerAppId),
          pa
        ]);
      });

      Promise.all(promises).then(data => {
        fetch(data[0], data[1]).then(friendListObj => {
          return res.json(parse(friendListObj));
        });
      })
    });
};
