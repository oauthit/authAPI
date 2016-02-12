import passport from 'passport';
import {Strategy as FacebookStrategy} from 'passport-facebook';
var debug = require('debug')('authAPI:facebook/passport');
import Token from '../../api/token/token.model';
import ProviderAccount from '../../api/providerAccount/providerAccount.model';

export function setup(config) {
  passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    ProviderAccount.find({
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

        ProviderAccount.save(postBody).then(() => {
          return Token.createToken(postBody).then((token) => {
            done(null, postBody, token);
          }, done);
        }, done);
      } else {
        body = JSON.parse(body)[0];
        return Token.createToken(body).then((token) => {
          done(null, body, token);
        }, done);
      }
    }, done);
  }));
}
