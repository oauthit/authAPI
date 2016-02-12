import passport from 'passport';
import {Strategy as FacebookStrategy} from 'passport-facebook';
var debug = require('debug')('authAPI:facebook/passport');
import Token from '../../api/token/token.model';

export function setup(Account, config) {
  passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    Account.findOne({
      provider: 'facebook',
      profileId: profile.id
    }).then((body) => {
      if (!body) {
        let postBody = {
          provider: 'facebook',
          profileId: profile.id,
          profileData: JSON.stringify(profile),
          name: profile.displayName
        };

        Account.save(postBody).then(() => {
          return Token.save(postBody).then((token) => {
            done(null, postBody, token);
          }, done);
        }, done);
      } else {
        return Token.save(body).then((token) => {
          done(null, body, token);
        }, done);
      }
    }, done);
  }));
}
