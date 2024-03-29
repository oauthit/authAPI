'use strict';

import compose from 'composable-middleware';
var debug = require('debug')('authAPI:auth:service');
import co from 'co';
import _ from 'lodash';
import {redisHelper} from 'sistemium-node';

var {hget, hset} = redisHelper;

export {hasRole, setAuthorized, isAuthenticated};

// const Account = model('Account');
import accountModel from '../models/account.model';
import providerAccountModel from '../models/providerAccount/providerAccount.model';
import socialAccountModel from '../models/socialAccount.model';
import tokenModel from '../models/token.model';
import orgAccountModel from '../models/orgAccount.model';

/**
 *
 * @params {Request} req - The express Request object
 * @params {Response} res - The express Response object
 * @params {function} next
 *
 * @return {}
 *
 * */
function validateAuth(req, res, next) {

  let token = req.headers.authorization;

  debug('validateAuth', 'token:', token);

  if (!token) {
    debug('info', 'Token is not defined, sending unauthorized status.');
    return res.sendStatus(401);
  }

  function authorized (data) {
    req.user = data && data.tokenInfo;
    debug('validateAuth: token:', data);
    if (!req.user) {
      return res.sendStatus(401);
    }
    req.authToken = data;
    next();
  }

  function getFromDb (token) {
    return tokenModel({}).findById(token)
      .then((dbData)=>{
        if (dbData) {
          hset('Token', token, dbData);
          authorized(dbData);
        } else {
          return res.sendStatus(401);
        }
      });
  }

  hget('Token', token)
    .then((redisData)=>{
      if (redisData) {
        authorized(redisData);
      } else {
        getFromDb(token);
      }
    }, (err) => {
      console.error('error getting token from redis:', err);
      getFromDb(token);
    });

}

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 401
 */
function isAuthenticated() {
  return compose(
    function (req, res, next) {
      if (req.query && req.query.hasOwnProperty('authorization:')) {
        req.headers.authorization = req.query ['authorization:'];
      }
      next();
    },
    validateAuth
  );
}

/**
 * Checks if the user role meets the minimum requirements of the route
 *
 * @params {String} roleRequired - Parameter for role name
 */
function hasRole(roleRequired) {
  if (!roleRequired) {
    debug(`roleRequired parameter missing...`);
    throw new Error('Required role needs to be set');
  }

  return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next) {

      var roles = _.get(req, 'user.tokeninfo.roles') || [];

      if (roles && (roles[roleRequired] || roles.indexOf(roleRequired) >= 0)) {
        debug(`User have role '${roleRequired}'`);
        next();
      } else {
        res.status(403).end('Forbidden');
      }
    });
}

/**
 *
 * @param providerApp {String} - Unique providerCode
 * @returns {Function}
 */
function setAuthorized(providerApp) {
  /**
   * Set token cookie directly for oAuth strategies
   *
   * @params {Request} req - Express Request object
   * @params {Response} res - Express Response object
   */

  return function (req, res) {

    debug('setAuthorized user:', req.user);
    debug('setAuthorized session:', req.session);

    let Account = accountModel(req);
    let ProviderAccount = providerAccountModel(req);
    let SocialAccount = socialAccountModel(req);
    let OrgAccount = orgAccountModel(req);

    co(function*() {

      req.user.provider = providerApp.provider;
      let socialAccount = yield SocialAccount.getOrCreate(req.user.socialAccountId, req.user);
      debug('socialAccount:', socialAccount);

      let providerAccount = yield new Promise((fulfil, reject) => {
        //TODO teach stapi to take js-data query for relations
        //socialAccount.find(socialAccount.id, {with: ['providerAccount']})

        ProviderAccount.find({socialAccountId: socialAccount.id})
          .then(providerAccounts => {

            debug('setAuthorized:providerAccounts:', providerAccounts);

            if (providerAccounts.length === 0) {

              let socialAccountId = socialAccount.id;
              delete socialAccount.id;

              let providerAccount = Object.assign({}, socialAccount, {
                socialAccountId: socialAccountId,
                accessToken: req.user.accessToken,
                profileData: req.user.profileData,
                roles: req.user.roles,
                providerAppId: providerApp.id
              });

              debug('providerAccount:', providerAccount);

              ProviderAccount.update(req.user.id, providerAccount)
                .then(providerAccount => {
                  return fulfil(providerAccount);
                }, err => {
                  debug('setAuthorized:providerAccount.update error:', err);
                  return reject(err);
                });

            } else {
              return fulfil(providerAccounts[0]);
            }

          }, err => {

            debug('setAuthorized:providerAccount.find error:', err);
            reject(err);

          });
      });

      var linkToAccountId = _.get(req, 'session.linkToAccountId');
      console.error('linkToAccountId:', linkToAccountId);

      if (linkToAccountId && !providerAccount.accountId) {
        providerAccount.accountId = linkToAccountId;
      }

      debug('setAuthorized: providerAccount:', providerAccount);

      let account = yield Account.getOrCreate(providerAccount.accountId, {
        name: providerAccount.name,
        roles: providerAccount.roles
      });
      providerAccount = Object.assign({}, providerAccount, {accountId: account.id});

      debug('setAuthorized: account:', account);


      yield ProviderAccount.update(providerAccount.id, providerAccount);

      // check session.orgId
      if (req.session && req.session.orgId) {

        let orgId = req.session.orgId;

        let orgAccount = yield OrgAccount.find({
          orgId: orgId,
          accountId: account.id
        });

        if (orgAccount.length === 0) {

          yield OrgAccount.save({
            orgId: orgId,
            accountId: account.id,
            name: account.name
          });

        }
      }

      let appId, orgId, orgAppId;

      if (req.session) {
        appId = req.session.appId;
        orgId = req.session.orgId;
        orgAppId = req.session.orgAppId;
      }

      let token = yield tokenModel({})
        .save({tokenInfo: account, accountId: account.id, appId, orgId, orgAppId})
        .then(token => {
          debug('setAuthorized:Token.create', token);
          return token.id;
        });

      delete req.session.appId;
      delete req.session.orgId;
      delete req.session.orgAppId;

      debug('setAuthorized: token:', token);

      let redirectUrl;

      if (req.session && req.session.returnTo) {
        redirectUrl = req.session.returnTo;
        delete req.session.returnTo;
      } else {
        redirectUrl = '/';
      }

      const slash = redirectUrl.match(/#/) ? '' : '#/';
      const question = redirectUrl.match(/\?/) ? '&' : '?';
      const finalUrl = `${redirectUrl}${slash}${question}access-token=${token}`;
      debug('setAuthorized:redirectUrl:', redirectUrl, finalUrl);
      return res.redirect(finalUrl);

    }).catch((err) => {
      //TODO delete req.session onError?
      debug('setAuthorized:catch:', err.data || err);
      return res.sendStatus(500);
    });

  };
}

