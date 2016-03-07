'use strict';

import passport from 'passport';
import config from '../../config/environment';
import {Strategy as FacebookStrategy} from 'passport-facebook';
var debug = require('debug')('authAPI:facebook/passport');
import Token from '../../api/token/token.model';
import ProviderToken from '../../api/providerToken/providerToken.model';
import FB from 'fb';

export function setup (Account, config) {
  var strategy = new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL
  }, (accessToken, refreshToken, profile, done) => {

    refreshToken().then(function (refToken) {

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
        refreshToken: JSON.stringify(refToken),
        appId: config.facebook.clientID
      }).then ((data, method) => {
        if (method !== 'get') {
          const HASH_KEY = provider + ':' + profile.id;
          ProviderToken.save(HASH_KEY, accessToken, refToken.access_token).then(function () {
            debug('facebook/passport', 'facebook access token was successfully saved!!');
          });
        }

        Token.save (data)
          .then (token => {
            done (null, data, token);
          },done)
        ;

      },done);

    });


  });

  passport.use(strategy);
}
