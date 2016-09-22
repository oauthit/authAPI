import {Strategy as OAuthStrategy} from 'passport-oauth2';
import rp from 'request-promise';
import basePassportSetup from '../basePassportSetup';

// var debug = require('debug')('authAPI:auth:sms:passport');

export default function(smsAuthUrl) {

  function userProfile (accessToken, done) {

    if (!accessToken) {
      console.error ('No access token calling SMS userProfile');
      return;
    }

    return rp({
      method: 'GET',
      url: smsAuthUrl + '/api/userinfo',
      headers: {
        'authorization': 'Bearer ' + accessToken
      },
      json: true
    }).then(body => {
      body.provider = 'sms';
      done(null, body);
    }).catch(err => {
      console.error('sms:passport error:', err);
      done(err);
    });

  }

  return basePassportSetup(OAuthStrategy,{userProfile});

}
