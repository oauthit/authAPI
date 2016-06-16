import passport from 'passport';
import {Strategy as OAuthStrategy} from 'passport-oauth2';
var debug = require('debug')('authAPI:sms/passport');
import passportCb from '../passportCallback';
import request from 'request';

OAuthStrategy.prototype.userProfile = function (accessToken, done) {

  request({
    method: 'GET',
    url: 'https://api.sistemium.com/pha/roles',
    headers: {
      'authorization': accessToken
    }
  }, (error, response, body) => {
    //debug('error:', error);
    //debug('response:', response);
    //debug('body:', body);

    done(null, JSON.parse(body).account);
  });
  //'https://api.sistemium.com/pha/roles', )

};

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

    //debug('accessToken:', accessToken);
    //debug('refreshToken:', refreshToken);
    //debug('profile:', profile);

    debug('done', done);

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
