'use strict';

import {model} from '../models/js-data/storeSchema';
import stapiApp from '../models/app.model';
import stapiOrgApp from '../models/orgApp.model';
import co from 'co';
import _ from 'lodash';

let Token = model('Token');
var debug = require('debug')('authAPI:middleware:authHelpers');

export {prepareToLinkProviderAccounts, setReturnTo, setAccount};


function setAccount(req, res, next) {
  if (!req.query.isPublic) {
    req.query.accountId = req.user.id;
  }
  next();
}


function setReturnTo(req, res, next) {

  co(function *() {
    if (req.path !== '/') {
      return next();
    }

    let returnTo = req.query.redirect_uri;
    let orgAppId = req.query.orgAppId;

    let orgApp = yield stapiOrgApp(req).findById(orgAppId);
    let orgId = orgApp.orgId;
    let appId = orgApp.appId;
    let app = yield stapiApp(req).findById(appId);

    //regexp for return_uri check, checking if redirect_uri is allowed
    let returnToRegEx = new RegExp(`^${_.escapeRegExp(returnTo)}.*`);

    if (!returnToRegEx.test(app.url)) {
        throw new Error(`Return to ${returnTo} is not allowed!!`);
    }

    if (req.session) {
      req.session.returnTo = returnTo;
      req.session.orgId = orgId;
      req.session.appId = appId;
      req.session.orgAppId = orgAppId;
    }
    debug ('setReturnTo returnTo:', returnTo, 'baseUrl:', req.baseUrl, 'path:', req.path);
    next();
  }).catch(err => {
    debug('setReturnTo:catch:', err.data || err);
    return res.sendStatus(500);
  });

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
