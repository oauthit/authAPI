import {Strategy as GoogleStrategy} from 'passport-google-oauth2';
// var debug = require('debug')('authAPI:google/passport');

import basePassportSetup from '../basePassportSetup';

export default basePassportSetup(GoogleStrategy);

// export function setup(ProviderAccount, providerApp) {
//   var strategy = new GoogleStrategy({
//     clientID: providerApp.clientId,
//     clientSecret: providerApp.clientSecret,
//     callbackURL: `${process.env.DOMAIN || ''}/auth/${providerApp.provider}/${providerApp.name}/callback`,
//     passReqToCallback: true
//   }, (request, accessToken, refreshToken, profile, done) => {
//
//     ProviderAccount.getOrCreate({
//       profileId: profile.id
//     }, {
//       profileData: profile,
//       profileId: profile.id,
//       name: profile.displayName,
//       roles: [],
//       accessToken: accessToken,
//       refreshToken: refreshToken,
//       providerAppId: providerApp.id
//     }).then(passportCb(providerApp.provider, profile, done), done);
//   });
//
//   strategy.name = 'google' + providerApp.code;
//   return strategy;
// }
