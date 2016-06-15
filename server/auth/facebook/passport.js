'use strict';

import passport from 'passport';
import {Strategy as FacebookStrategy} from 'passport-facebook';
var debug = require('debug')('authAPI:facebook/passport');
import refresh_token from '../../api/social/facebook/refreshToken.service';
import passportCb from '../passportCallback';

export function setup(ProviderAccount, providerAppConfig) {
  var strategy = new FacebookStrategy({
    clientID: providerAppConfig.clientId,
    clientSecret: providerAppConfig.clientSecret,
    callbackURL: (process.env.DOMAIN || '') + '/auth/' + providerAppConfig.code + '/callback',
    passReqToCallback: true
  }, (req, accessToken, refreshToken, profile, done) => {

    function processToken(refToken) {

      debug('refreshToken:', refToken);

      ProviderAccount.getOrCreate({
          profileId: profile.id
        }, {
          profileData: profile,
          profileId: profile.id,
          name: profile.displayName,
          roles: [],
          accessToken: accessToken,
          refreshToken: refToken && JSON.stringify(refToken) || null,
          providerAppId: providerAppConfig.id
        })
        .then(passportCb(providerAppConfig.provider, profile, done), done);

    }

    refresh_token('facebook', profile.id).then(processToken, function () {
      processToken();
    });
  });

  strategy.name = 'facebook' + providerAppConfig.code;
  return strategy;
}
