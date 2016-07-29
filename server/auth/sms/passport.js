import passport from 'passport';
import {Strategy as OAuthStrategy} from 'passport-oauth2';
var debug = require('debug')('authAPI:sms/passport');
import passportCb from '../passportCallback';
import rp from 'request-promise';
import config from '../../config/environment';
import basePassportSetup from '../basePassportSetup';

var smsAuthUrl = config.smsAuth.url;

OAuthStrategy.prototype.userProfile = function (accessToken, done) {

  return rp({
    method: 'GET',
    url: smsAuthUrl + '/api/userinfo',
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

export default basePassportSetup(OAuthStrategy);

// export function setup(req, ProviderAccount, providerApp) {
//   debug (providerApp);
//   debug (providerApp.code);
//   var strategy = new OAuthStrategy({
//     //TODO authorization url
//     authorizationURL: smsAuthUrl + '/dialog/authorize',
//     tokenURL: smsAuthUrl + '/oauth/token',
//     //TODO change record for correct clientID and clientSecret
//     clientID: 'db089742-97e7-483d-ba7f-7b4a0485b082',
//     clientSecret: 'someSecret' || providerApp.clientSecret,
//     scope: 'offline_access',
//     callbackURL: `${process.env.DOMAIN || ''}/auth/${providerApp.provider}/${providerApp.name}/callback`,
//     passReqToCallback: true
//   }, (req, accessToken, refreshToken, profile, done) => {
//
//     //debug('accessToken:', accessToken);
//     //debug('refreshToken:', refreshToken);
//     //debug('profile:', profile);
//
//     debug('done', done);
//     debug('profile', profile);
//
//     profile.id = profile.authId;
//
//     ProviderAccount.getOrCreate({
//       profileId: profile.id
//     }, {
//       profileData: profile,
//       profileId: profile.id,
//       name: profile.name,
//       //TODO change this
//       roles: [],
//       accessToken: accessToken,
//       refreshToken: refreshToken,
//       providerAppId: providerApp.id
//     }).then(passportCb(providerApp.provider, profile, done), done);
//   });
//
//   strategy.name = providerApp.code;
//   return strategy;
// }
