import passport from 'passport';
import config from '../../config/environment';
import {Strategy as GoogleStrategy} from 'passport-google-oauth2';
var debug = require('debug')('authAPI:facebook/passport');
import Token from '../../api/token/token.model';

export function setup(Account, config) {
  passport.use(new GoogleStrategy({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackURL
  }, (request, accessToken, refreshToken, profile, done) => {

    Account.getOrCreate({
      provider: 'google',
      profileId: profile.id
    }, {
      profileData: profile,
      name: profile.displayName,
      roles: ['user'],
      accessToken: refreshToken.access_token,
      refreshToken: refreshToken.id_token,
      appId: config.google.clientID
    }).then(data => {

      Token.save(data)
        .then(token => {
          done(null, data, token);
        }, done)
      ;

    }, (err) => {
      done(err.text || 'Something went wrong...');
    });

  }));
}
