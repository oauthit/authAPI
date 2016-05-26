'use strict';

import passport from 'passport';
import config from '../../config/environment';
import {Strategy as FacebookStrategy} from 'passport-facebook';
var debug = require('debug')('authAPI:facebook/passport');
import refresh_token from '../../api/social/facebook/refreshToken.service';
import passportCb from '../passportCallback';

export function setup(ProviderAccount, config) {
  var strategy = new FacebookStrategy({
    clientID: config.clientId,
    clientSecret: config.clientSecret,
    callbackURL: (process.env.DOMAIN || '') + '/auth/' + config.code + '/callback',
    passReqToCallback: true
  }, (req, accessToken, refreshToken, profile, done) => {

    function processToken(refToken) {

      debug('refreshToken:', refToken);

      var provider = 'facebook';
      ProviderAccount.getOrCreate({
          provider: provider,
          profileId: profile.id
        }, {
          profileData: profile,
          name: profile.displayName,
          roles: ['admin'],
          accessToken: accessToken,
          refreshToken: refToken && JSON.stringify(refToken) || null,
          appId: config.clientID
        })
        .then(passportCb(provider, profile, done), done);
    }

    refresh_token('facebook', profile.profileId).then(processToken, function () {
      processToken();
    });
  });

  strategy.name = 'facebook' + config.code;
  passport.use(strategy);
}
