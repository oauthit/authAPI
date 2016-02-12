import passport from 'passport';
import {Strategy as FacebookStrategy} from 'passport-facebook';
var debug = require('debug')('authAPI:facebook/passport');
import request from 'request';
import redis from 'redis';
var redisClient = redis.createClient();
import uuid from 'node-uuid';

function createToken (body, done) {
  //generate token
  let token = uuid.v4();
  redisClient.hset('authHash', token, JSON.stringify(body), (err) => {
    if (err) done(err);

    done(null, body, token);
  })
}

export function setup(config) {
  passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
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

          return createToken(postBody, done);
        });
      } else {
        return createToken(JSON.parse(body)[0], done);
      }
    });

  }));
}
