'use strict';

import passport from 'passport';
import config from '../../config/environment';
import {Strategy as FacebookStrategy} from 'passport-facebook';
var debug = require('debug')('authAPI:facebook/passport');
import Token from '../../api/token/token.model';
import ProviderToken from '../../api/providerToken/providerToken.model';
import refresh_token from '../../api/social/facebook/refreshToken';
import FB from 'fb';

export function setup (Account, config) {
  var strategy = new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL
  }, (accessToken, refreshToken, profile, done) => {

    function processToken(refToken) {

      debug('refreshToken:', refToken);

      var provider = 'facebook';
      Account.getOrCreate({
        provider: provider,
        profileId: profile.id
      },{
        profileData: profile,
        name: profile.displayName,
        roles: ['admin'],
        accessToken: accessToken,
        refreshToken: refToken && JSON.stringify(refToken) || null,
        appId: config.facebook.clientID
      }).then ((data) => {

        ProviderToken.save(provider+':'+profile.id, accessToken, refToken).then(function () {

          Token.save (data)
            .then (token => {
              done (null, data, token);
            },done)
          ;

        });

      },done);

    }

    refresh_token('facebook', profile.profileId).then(processToken, function () {
      processToken();
    });


  });

  passport.use(strategy);
}
