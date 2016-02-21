import config from '../../config/environment';
import FB from 'fb';

FB.options({
  appId: config.facebook.clientID,
  appSecret: config.facebook.clientSecret
});

var express = require('express');

var router = express.Router();

router.get('/', (req, res) => {
  FB.api('me/friends?limit=1', function (res) {
    if(!res || res.error) {
      console.log(!res ? 'error occurred' : res.error);
      return;
    }
    console.log(res);
  });
  return res.status(200).end();
});

module.exports = router;
