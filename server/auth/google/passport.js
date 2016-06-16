import passport from 'passport';
import {Strategy as GoogleStrategy} from 'passport-google-oauth2';
var debug = require('debug')('authAPI:google/passport');
import passportCb from '../passportCallback';

export function setup(ProviderAccount, config) {
  var strategy = new GoogleStrategy({
    clientID: config.clientId,
    clientSecret: config.clientSecret,
    callbackURL: (process.env.DOMAIN || '') + '/auth/' + config.code + '/callback',
    passReqToCallback: true
  }, (request, accessToken, refreshToken, profile, done) => {

    ProviderAccount.getOrCreate({
      profileId: profile.id
    }, {
      profileData: profile,
      profileId: profile.id,
      name: profile.displayName,
      roles: [],
      accessToken: accessToken,
      refreshToken: refreshToken,
      providerAppId: config.id
    }).then(passportCb(config.provider, profile, done), done);
  });

  strategy.name = 'google' + config.code;
  console.log(strategy.name);
  return strategy;
}
