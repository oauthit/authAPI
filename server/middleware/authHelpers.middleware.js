'use strict';

import {model} from '../models/js-data/storeSchema';

let Token = model('Token');
var debug = require('debug')('authAPI:middleware:authHelpers');


function prepareToLinkProviderAccounts (req,res,next){

  let token = req.query.access_token;

  if (token) {
    Token.find(token).then((data) => {
      req.user = data && data.tokenInfo;
      debug('prepareToLinkProviderAccounts: token:', data);
      if (!req.user) {
        return res.sendStatus(401);
      }
      if (req.session) {
        req.session.linkToAccountId = req.user.id;
      }
      next();
    }, (err) => {
      console.error('prepareToLinkProviderAccounts error:', err);
      return res.sendStatus(401);
    });
  } else {
    next();
  }

}


export {prepareToLinkProviderAccounts};
