'use strict';
import Token from '../api/token/token.model';
import ProviderToken from '../api/providerToken/providerToken.model';
import account from '../api/account/account.model';
var Account = account();
var debug = require('debug')('authAPI:passportCallback');

export default (provider, profile, done) => {
  return (data) => {
    ProviderToken.save(provider, profile.id, data.accessToken, data.refreshToken).then(function () {
      if (data.account) {
        Account.findById(data.account)
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
