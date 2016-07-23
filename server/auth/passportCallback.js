'use strict';

import Token from '../models/js-data/token.model';
import ProviderToken from '../models/providerToken.model.js';
import account from '../models/account.model.js';

var Account = account();
var debug = require('debug')('authAPI:auth:passportCallback');

export default (provider, profile, done) => {
  return (data) => {

    ProviderToken.createToken(provider, profile.id, data.accessToken, data.refreshToken)
      .then(function () {

        debug('token created:', data);

        if (data.accountId) {
          Account.findById(data.accountId)
            .then((account) => {

              debug('account data:', account);
              Token.create({tokenInfo: account})
                .then(token => {
                  done(null, data, token);
                }, done)
              ;
            }, done)
            .catch(done);
        } else {
          debug(data);
          done(null, data);
        }

      })
      .catch(err => {
        debug('error', err);
        done(err);
      });

  };
};
