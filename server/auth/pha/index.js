'use strict';

import express from 'express';
import {post,get} from 'request';

var debug = require ('debug') ('authAPI:pha');
var router = express.Router();

const phaUrl = 'https://api.sistemium.com/pha/auth';
const rolesUrl = 'https://api.sistemium.com/pha/roles';

import Token from '../../api/token/token.model';
import Account from '../../api/providerAccount/account.model.js';


var err401 = function (res) {
  return function (err) {

    res.status (401)
      .end (err);

  };
};


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


var numberProcessor = function(req, res) {

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

var smsProcessor = function(req, res, next) {

  let smsCode = req.params.smsCode;
  let authToken = req.params.authToken;

  if (!authToken || !smsCode) {
    return res.status(401).end();
  }

  let $401 = err401(res);

  post ({
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

    debug ('smsProcessor', 'info:', info);

    roles (info.accessToken)
      .then (data => {

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

        Account.getOrCreate(keys,acc).then (account => {

          Token.save (account)
            .then (token => {
              req.user = account;
              req.authInfo = token;
              next ();
            },$401)
          ;

        },$401);

      },$401)
    ;

  })

};

var success = function (req,res,next) {

  if (req.authInfo) {
    res.set('X-Access-Token',req.authInfo);
    res.json(req.user);
  }

};


router
  .get ('/:mobileNumber', numberProcessor)
  .get ('/:authToken/:smsCode', smsProcessor, success)
  .get ('/:mobileNumber/:authToken/:smsCode', smsProcessor, success);

export default router;
