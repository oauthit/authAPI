import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';

function localAuthenticate(Account, email, password, done) {
  Account.find({
    provider: 'localEmail',
    email: email.toLowerCase()
  })
    .then(account => {
      if (!account) {
        return done(null, false, {
          message: 'This email is not registered.'
        });
      }
      account.authenticate(password, function(authError, authenticated) {
        if (authError) {
          return done(authError);
        }
        if (!authenticated) {
          return done(null, false, { message: 'This password is not correct.' });
        } else {
          return done(null, account);
        }
      });
    })
    .catch(err => done(err));
}

export function setup(Account, config) {
  passport.use(new LocalStrategy({
    nameField: 'email',
    passwordField: 'password'
  }, function(email, password, done) {
    return localAuthenticate(Account, email, password, done);
  }));
}
