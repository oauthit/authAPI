import passport from 'passport';
import config from '../../config/environment';
import {Strategy as FacebookStrategy} from 'passport-facebook';
var debug = require('debug')('authAPI:facebook/passport');
import Token from '../../api/token/token.model';

export function setup (Account, config) {
  passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL
  }, (accessToken, refreshToken, profile, done) => {

    Account.getOrCreate({
      provider: 'facebook',
      profileId: profile.id
    },{
      profileData: profile,
      name: profile.displayName,
      roles: ['admin'],
      accessToken: accessToken,
      refreshToken: refreshToken,
      appId: config.facebook.clientID
    }).then (data => {

      Token.save (data)
        .then (token => {
          done (null, data, token);
        },done)
      ;

    },done)

  }))
}
