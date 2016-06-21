import passport from 'passport';
import {Strategy as OAuthStrategy} from 'passport-oauth2';
var debug = require('debug')('authAPI:sms/passport');
import passportCb from '../passportCallback';
import rp from 'request-promise';

OAuthStrategy.prototype.userProfile = function (accessToken, done) {

  return rp({
    method: 'GET',
    url: 'http://localhost:3000/api/userinfo',
    headers: {
      'authorization': 'Bearer ' + accessToken
    }
  }).then(body => {
    body = JSON.parse(body);
    done(null, body);
  }).catch(err => {
    debug('error:', err);
    done(err);
  });
  //'https://api.sistemium.com/pha/roles', )

};

export function setup(ProviderAccount, config) {
  debug (config);
  var strategy = new OAuthStrategy({
    //TODO authorization url
    authorizationURL: 'http://localhost:3000/dialog/authorize',
    tokenURL: 'http://localhost:3000/oauth/token',
    clientID: config.clientId,
    clientSecret: config.clientSecret,
    scope: 'offline_access',
    callbackURL: (process.env.DOMAIN || '') + '/auth/' + config.code + '/callback'
  }, (accessToken, refreshToken, profile, done) => {

    //debug('accessToken:', accessToken);
    //debug('refreshToken:', refreshToken);
    //debug('profile:', profile);

    debug('done', done);
    debug('profile', profile);

    profile.id = profile.authId;

    ProviderAccount.getOrCreate({
      profileId: profile.id
    }, {
      profileData: profile,
      profileId: profile.id,
      name: profile.name,
      //TODO change this
      roles: [],
      accessToken: accessToken,
      refreshToken: refreshToken,
      providerAppId: config.id
    }).then(passportCb(config.provider, profile, done), done);
  });

  strategy.name = config.code;
  return strategy;
}
