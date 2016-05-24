import {post, get} from 'request';
import account from '../../models/account.model.js';
import Token from '../../api/token/token.model';

var debug = require ('debug') ('authAPI:pha:smsProcessor');

//todo extract to config
const phaUrl = 'https://api.sistemium.com/pha/auth';
const rolesUrl = 'https://api.sistemium.com/pha/roles';

var roles = function (token) {
  return new Promise ((resolve,reject) => {
    get ({
      url: rolesUrl,
      headers: {
        authorization: token
      },
      json: true
    }, (err,res,data) => {
      //debug ('roles:', data);
      return err ? reject (err) : resolve (data);
    })
  })
};

var err401 = function (res) {
  return function (err) {

    res.status (401)
      .end (err);

  };
};


export default function(req, res, next) {

  let smsCode = req.params.smsCode;
  let authToken = req.params.authToken;

  if (!authToken || !smsCode) {
    return res.status(401).end();
  }

  let $401 = err401(res);

  post({
    url: phaUrl,
    qs: {
      smsCode: smsCode,
      ID: authToken
    },
    json: true
  }, (err, authRes, info) => {

    if (err || !info || !info.accessToken) {
      return res.status(404).json({
        message: 'Something went wrong, please try again.',
        info: info
      });
    }

    debug('smsProcessor', 'info:', info);

    roles(info.accessToken)
      .then(data => {

        let profile = data.account;

        let keys = {
          provider: 'pha',
          profileId: profile.authId
        };

        let acc = {
          profileData: profile,
          name: profile.name,
          roles: data.roles
        };

        account().getOrCreate(keys, acc).then(account => {

          Token.save(account)
            .then(token => {
              req.user = account;
              req.authInfo = token;
              next();
            }, $401)
          ;

        }, $401);

      }, $401)
    ;

  })
};
