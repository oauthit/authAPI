import passport from 'passport';
import {Strategy as FacebookStrategy} from 'passport-facebook';
var debug = require('debug')('authAPI:facebook/passport');
import request from 'request';

export function setup(Account, config) {
  passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    //TODO request stapi for providerAccount where provider is facebook and providerProfileId is profile.id

    request({
      url: 'http://localhost:9000/api/aa/providerAccount',
      qs: {
        provider: 'facebook',
        profileId: profile.id
      }
    }, function (err, res, body) {
      if (!body) {
        let postBody = {
          provider: 'facebook',
          profileId: profile.id,
          profileData: JSON.stringify(profile),
          name: profile.displayName
        };
        request.post({
          url: 'http://localhost:9000/api/aa/providerAccount',
          form: postBody
        }, function (err) {
          if (err) return done(err);

          return done(null, postBody);
        });
      } else {
        return done(null, body);
      }
    });

  }));
}
