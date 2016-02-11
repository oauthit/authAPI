import passport from 'passport';
import {Strategy as FacebookStrategy} from 'passport-facebook';
var debug = require('debug')('authAPI:facebook/passport');
import ProviderAccount from '../../api/providerAccount/providerAccount.model';

export function setup(Account, config) {
  passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL,
    profileFields: [
      'displayName',
      'emails'
    ]
  },
  function(accessToken, refreshToken, profile, done) {
    //TODO request stapi for providerAccount where provider is facebook and providerProfileId is profile.id
    ProviderAccount.find({
      'provider': 'facebook',
      'profileId': profile.id
    })
      .then(user => {
        if (user) {
          return done(null, user);
        }

        //user = new User({
        //  name: profile.displayName,
        //  email: profile.emails[0].value,
        //  role: 'user',
        //  provider: 'facebook',
        //  facebook: profile._json
        //});
        debug(user);
        user.save()
          .then(user => done(null, user))
          .catch(err => done(err));
      })
      .catch(err => done(err));
  }));
}
