import passport from 'passport';
import config from '../../config/environment';
import {Strategy as GoogleStrategy} from 'passport-google-oauth2';
var debug = require('debug')('authAPI:google/passport');
import passportCb from '../passportCallback';

export function setup(ProviderAccount, config) {
  var strategy = new GoogleStrategy({
    clientID: config.clientId,
    clientSecret: config.clientSecret,
    callbackURL: config.callbackURL,
    passReqToCallback: config.passReqToCallback
  }, (request, accessToken, refreshToken, profile, done) => {

    let provider = 'google';

    ProviderAccount.getOrCreate({
      provider: provider,
      profileId: profile.id
    }, {
      profileData: profile,
      name: profile.displayName,
      //TODO change this
      roles: ['admin'],
      accessToken: accessToken,
      refreshToken: refreshToken,
      appId: config.clientId
    }).then(passportCb(provider, profile, done), done);
  });

  strategy.name = 'google' + config.code;
  passport.use(strategy);
}
