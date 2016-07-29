'use strict';

import {Strategy as FacebookStrategy} from 'passport-facebook';
var debug = require('debug')('authAPI:facebook/passport');
// import refresh_token from '../../api/social/facebook/refreshToken.service';
import basePassportSetup from '../basePassportSetup';

console.error('facebook');


export default basePassportSetup(FacebookStrategy);

// export function setup(ProviderAccount, providerApp) {
//   var strategy = new FacebookStrategy({
//     clientID: providerApp.clientIdp
//     clientSecret: providerApp.clientSecret,
//     callbackURL: `${process.env.DOMAIN || ''}/auth/${providerApp.provider}/${providerApp.name}/callback`,
//     passReqToCallback: true
//   }, (req, accessToken, refreshToken, profile, done) => {
//
//     function processToken(refToken) {
//
//       debug('refreshToken:', refToken);
//
//       ProviderAccount.getOrCreate({
//           profileId: profile.id
//         }, {
//           profileData: profile,
//           profileId: profile.id,
//           name: profile.displayName,
//           roles: [],
//           accessToken: accessToken,
//           refreshToken: refToken && JSON.stringify(refToken) || null,
//           providerAppId: providerApp.id
//         })
//         .then(passportCb(providerApp.provider, profile, done), done);
//
//     }
//
//     //check if it necessary
//     // refresh_token('facebook', profile.id).then(processToken, function () {
//     //   processToken();
//     // });
//   });
//
//   strategy.name = 'facebook' + providerApp.code;
//   return strategy;
// }
