'use strict';

import config from '../../config/environment';
import FB from 'fb';
var debug = require('debug')('authAPI:fb/index');
import refreshToken from './refreshToken';
import ProviderToken from '../../api/providerToken/providerToken.model';

FB.options({
  appId: config.facebook.clientID,
  appSecret: config.facebook.clientSecret
});

var express = require('express');

var router = express.Router();

router.get('/', (req, res) => {
  //get access token by profile id
  const PROFILE = req.user.provider+':'+req.user.profileId;
  ProviderToken.findByProfileId(PROFILE).then(function (res) {
    console.log(res);
  });

  FB.api('me/friends?limit=10', function (res) {
    if(!res || res.error) {
      console.log(!res ? 'error occurred' : res.error);
      return;
    }
    console.log(res);
  });
  return res.status(200).end();
});

router.get('/refreshToken', (req, response) => {

  refreshToken(req.user.provider, req.user.profileId).then(function () {
    response.end();
  }, function () {
    response.end();
  });

});

module.exports = router;
