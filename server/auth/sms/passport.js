import {Strategy as OAuthStrategy} from 'passport-oauth2';
import rp from 'request-promise';
import config from '../../config/environment';
import basePassportSetup from '../basePassportSetup';

var smsAuthUrl = config.smsAuth.url;

OAuthStrategy.prototype.userProfile = function (accessToken, done) {

  return rp({
    method: 'GET',
    url: smsAuthUrl + '/api/userinfo',
    headers: {
      'authorization': 'Bearer ' + accessToken
    }
  }).then(body => {
    console.log(body);
    body = JSON.parse(body);
    done(null, body);
  }).catch(err => {
    console.error('sms:passport error:', err);
    done(err);
  });

};

export default basePassportSetup(OAuthStrategy);
