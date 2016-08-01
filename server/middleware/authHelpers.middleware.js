'use strict';

import {model} from '../models/js-data/storeSchema';

let Token = model('Token');
var debug = require('debug')('authAPI:middleware:authHelpers');

function setReturnTo(req, res, next) {

  if (req.path !== '/') {
    return next();
  }

  let returnTo = req.query.redirect_uri;

  // TODO: check if redirect_uri is allowed by ProviderApp.allowedRedirectUris

  if (req.session) {
    req.session.returnTo = returnTo;
  }
  debug ('setReturnTo returnTo:', returnTo, 'baseUrl:', req.baseUrl, 'path:', req.path);
  next();
}


function prepareToLinkProviderAccounts(req, res, next) {

  if (req.path !== '/') {
    return next();
  }

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
    if (req.session) {
      delete req.session.linkToAccountId;
    }
    next();
  }

}


export {prepareToLinkProviderAccounts, setReturnTo};
