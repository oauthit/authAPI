'use strict';

import ProviderToken from '../models/providerToken.model.js';
var debug = require('debug')('authAPI:auth:passportCallback');

export default (provider, profile, done) => {
  return (data) => {

    ProviderToken.createToken(provider, profile.id, data.accessToken, data.refreshToken)
      .then(function () {
        debug('token created:', data);
        done(null, data);
      })
      .catch(done);

  };
};
