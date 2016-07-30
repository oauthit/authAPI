import {Strategy as OAuthStrategy} from 'passport-oauth2';
import rp from 'request-promise';
import config from '../../config/environment';
import basePassportSetup from '../basePassportSetup';

var debug = require('debug')('authAPI:auth:sms:passport');
var smsAuthUrl = config.smsAuth.url;

function userProfile (accessToken, done) {

  if (!accessToken) {
    console.error ('No access token calling SMS userProfile');
    // return;
  }

  return rp({
    method: 'GET',
    url: smsAuthUrl + '/api/userinfo',
    headers: {
      'authorization': 'Bearer ' + accessToken
    }
  }).then(body => {
    console.log(body);
    body = JSON.parse(body);
    body.provider = 'sms';
    done(null, body);
  }).catch(err => {
    console.error('sms:passport error:', err);
    done(err);
  });

}

export default basePassportSetup(OAuthStrategy,{userProfile});
