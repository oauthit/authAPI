'use strict';

import fetch from './fetch';
import parse from './parse';
import socialAccount from '../../../models/socialAccount.model';

export default function (providerApp, profileId) {
  return function (req) {
    return new Promise((resolve, reject) => {
      fetch(providerApp, profileId)
        .then(friendListObj => {
          let parsedSocialAccounts = parse(friendListObj);
          socialAccount(req).save(parsedSocialAccounts);
        })
        .catch(err => {
          return reject(err);
        })
      ;
    });
  };
}
