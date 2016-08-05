'use strict';

import {model} from '../models/js-data/storeSchema';
import stapiApp from '../models/app.model';
import stapiOrgApp from '../models/orgApp.model';
import co from 'co';
import _ from 'lodash';

let Token = model('Token');
var debug = require('debug')('authAPI:middleware:authHelpers');

export {
  prepareToLinkProviderAccounts,
  setQueryParamsToSession,
  checkIfValidRedirectUri,
  setAccount,
  setOrgApp,
  stripIdFromName
};

function stripIdFromName (name){
  return (req,res,next)=>{

    let id = req.query[`${name}Id`];

    if (id) {
      req.query.id = id;
    }

    next();

  }
}

function setAccount(req, res, next) {
  req.query.accountId = req.user.id;
  next();
}

function setOrgApp(req, res, next) {

  let token = req.authToken;
  if (token) {
    if (token.appId) {
      req.query.appId = token.appId;
    }
    if (token.orgId) {
      req.query.orgId = token.orgId;
    }
  }

  next();

}

function setQueryParamsToSession(req, res, next) {

  co(function *() {
    if (req.path !== '/') {
      return next();
    }

    let returnTo = req.query.redirect_uri;
    let orgAppId = req.query.orgAppId;

    if (!(returnTo && orgAppId)) {

      if (req.session) {
        delete req.session.returnTo;
        delete req.session.appId;
        delete req.session.orgId;
      }

      return next();
    }

    let orgApp = yield stapiOrgApp(req).findById(orgAppId);
    let orgId = orgApp.orgId;
    let appId = orgApp.appId;

    if (req.session) {
      req.session.returnTo = returnTo;
      req.session.orgAppId = orgAppId;
      req.session.orgId = orgId;
      req.session.appId = appId;
    }
    debug('setQueryParamsToSession returnTo:', returnTo, 'baseUrl:', req.baseUrl, 'path:', req.path);
    next();
  }).catch(err => {
    debug('setQueryParamsToSession:catch:', err.data || err);
    return res.sendStatus(500);
  });

}

function checkIfValidRedirectUri(req, res, next) {

  co(function *() {
    if (req.session) {

      let returnTo = req.session.returnTo;
      let appId = req.session.appId;


      //don't check app if no returnTo
      if (!(returnTo && appId)) {
        delete req.session.appId;
        return next();
      }

      let app = yield stapiApp(req).findById(appId);

      //regexp for return_uri check, checking if redirect_uri is allowed
      let urlRegEx = new RegExp(`^${_.escapeRegExp(app.url)}.*`);

      if (!urlRegEx.test(returnTo)) {
        delete req.session.appId;
        let error = `Return to ${returnTo} is not allowed!!`;
        return res.redirect(`${req.headers.referer}#/?error=${error}`);
      }
    }

    next();
  }).catch(err => {
    debug('checkIfValidRedirectUri:catch:', err);
    next(err);
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
