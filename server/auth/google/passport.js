import passport from 'passport';
import config from '../../config/environment';
import {Strategy as GoogleStrategy} from 'passport-google-oauth2';
var debug = require('debug')('authAPI:facebook/passport');
import Token from '../../api/token/token.model';
import ProviderToken from '../../api/providerToken/providerToken.model';
import account from '../../api/account/account.model';
var Account = account();

export function setup(ProviderAccount, config) {
  passport.use(new GoogleStrategy({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackURL,
    passReqToCallback: true
  }, (request, accessToken, refreshToken, profile, done) => {

    let provider = 'google';
    debug(request);

    ProviderAccount.getOrCreate({
      provider: provider,
      profileId: profile.id
    }, {
      profileData: profile,
      name: profile.displayName,
      //TODO change this
      roles: ['admin'],
      accessToken: accessToken,
      refreshToken: refreshToken,
      appId: config.google.clientID
    }).then((data) => {

      ProviderToken.save(provider, profile.id, data.accessToken, data.refreshToken).then(function () {
        if (data.accountId) {
          Account.findById(data.accountId)
            .then((data) => {
              Token.save(data)
                .then(token => {
                  done(null, data, token);
                }, done)
              ;
            }, done)
            .catch(done)
          ;
        } else {
          debug(data);
          done(null, data);
        }

      });

    }, done);


  }));
}
