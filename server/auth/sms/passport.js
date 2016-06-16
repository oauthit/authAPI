import passport from 'passport';
import {Strategy as OAuthStrategy} from 'passport-oauth2';
var debug = require('debug')('authAPI:sms/passport');
import passportCb from '../passportCallback';

export function setup(ProviderAccount, config) {
  debug (config);
  var strategy = new OAuthStrategy({
    //TODO authorization url
    authorizationURL: 'http://localhost:3000/#/login',
    tokenURL: 'http://localhost:9999/auth/code',
    clientID: config.clientId,
    clientSecret: config.clientSecret,
    callbackURL: (process.env.DOMAIN || '') + '/auth/' + config.code + '/callback'
  }, (accessToken, refreshToken, profile, done) => {

    profile = {
      id: 1000
    };

    debug('accessToken:', accessToken);
    debug('refreshToken:', refreshToken);
    debug('profile:', profile);

    ProviderAccount.getOrCreate({
      profileId: profile.id
    }, {
      profileData: profile,
      profileId: profile.id,
      //TODO change this
      roles: [],
      accessToken: accessToken,
      refreshToken: refreshToken,
      providerAppId: config.id
    }).then(passportCb, done);
  });

  strategy.name = config.code;
  return strategy;
}
