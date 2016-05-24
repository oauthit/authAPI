import {post} from 'request';

var debug = require ('debug') ('authAPI:pha');

//todo extract to config
const phaUrl = 'https://api.sistemium.com/pha/auth';

export default function(req, res) {

  if (!req.params.mobileNumber) {
    return res.status(401).end();
  }

  post ({
    url: phaUrl,
    json: true,
    qs: {
      mobileNumber: req.params.mobileNumber
    }
  }, function(err, phaRes, info) {

    if (err || !info) {
      return res.status(404).json({
        message: 'Something went wrong, please try again.',
        info: info,
        error: err
      });
    }

    res.json(info);

  })

};
