'use strict';
import Token from '../api/token/token.model';
import ProviderToken from '../models/providerToken.model.js';
import account from '../models/account.model.js';
var Account = account();
var debug = require('debug')('authAPI:passportCallback');

export default (provider, profile, done) => {
  return (data) => {
    ProviderToken.save(provider, profile.id, data.accessToken, data.refreshToken).then(function () {
      if (data.accountId) {
        Account.findById(data.accountId)
          .then((data) => {
            Token.save(data)
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
    });

  }
}
