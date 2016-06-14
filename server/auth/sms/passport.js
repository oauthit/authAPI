import passport from 'passport';
import config from '../../config/environment';
import {Strategy as OAuthStrategy} from 'passport-oauth2';
var debug = require('debug')('authAPI:google/passport');
import passportCb from '../passportCallback';

export function setup(ProviderAccount, config) {
  var strategy = new OAuthStrategy({
    //TODO authorization url
    authorizationURL: 'http://localhost:3000/#/login',
    tokenURL: 'https://api.sistemium.com/auth/pha/roles',
    clientID: config.clientId,
    clientSecret: config.clientSecret,
    callbackURL: (process.env.DOMAIN || '') + '/auth/' + config.code + '/callback'
  }, (accessToken, refreshToken, profile, done) => {

    debug('accessToken:', accessToken);
    debug('refreshToken:', refreshToken);
    debug('profile:', profile);

    ProviderAccount.getOrCreate({
      provider: config.code,
      profileId: profile.id
    }, {
      profileData: profile,
      //TODO change this
      roles: [],
      accessToken: accessToken,
      refreshToken: refreshToken,
      appId: config.clientId
    }).then(passportCb(provider, profile, done), done);
  });

  strategy.name = config.code;
  passport.use(strategy);
}
