'use strict';

import compose from 'composable-middleware';
var debug = require('debug')('authAPI:auth:service');
import {model, models} from '../models/js-data/storeSchema';
import stapiOrgAccount from '../models/orgAccount.model.js';
import co from 'co';
import _ from 'lodash';


export {hasRole, setAuthorized, isAuthenticated};

const Account = model('Account');
const ProviderAccount = model('ProviderAccount');
const SocialAccount = model('SocialAccount');
const Token = model('Token');
const ProviderApp = model('ProviderApp');


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

  Token.find(token).then((data) => {
    req.user = data && data.tokenInfo;
    debug('validateAuth: token:', data);
    if (!req.user) {
      return res.sendStatus(401);
    }
    next();
  }, (err) => {
    debug('error:', err);
    return res.sendStatus(401);
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

    co(function*() {

      let socialAccount = yield SocialAccount.findOrCreate(req.user.socialAccountId, req.user);
      debug('socialAccount:', socialAccount);

      let providerAccount = yield new Promise((fulfil, reject) => {
        //TODO teach stapi to take js-data query for relations
        //SocialAccount.find(socialAccount.id, {with: ['providerAccount']})

        ProviderAccount.findAll({socialAccountId: socialAccount.id})
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

              ProviderAccount.update(req.user.id, providerAccount)
                .then(providerAccount => {
                  return fulfil(providerAccount);
                }, err => {
                  debug('setAuthorized:ProviderAccount.update error:', err);
                  return reject(err);
                });

            } else {
              return fulfil(providerAccounts[0]);
            }

          }, err => {

            debug('setAuthorized:ProviderAccount.findAll error:', err);
            reject(err);

          });
      });

      var linkToAccountId = _.get(req, 'session.linkToAccountId');
      console.error('linkToAccountId:', linkToAccountId);

      if (linkToAccountId && !providerAccount.accountId) {
        providerAccount.accountId = linkToAccountId;
      }

      debug('setAuthorized: providerAccount:', providerAccount);

      let account = yield Account.findOrCreate(providerAccount.accountId, {
        name: providerAccount.name,
        roles: providerAccount.roles
      });
      providerAccount = Object.assign({}, providerAccount, {accountId: account.id});

      debug('setAuthorized: account:', account);


      yield ProviderAccount.update(providerAccount.id, providerAccount);

      let token = yield Token.create({tokenInfo: account, accountId: account.id}).then(token => {
        debug('setAuthorized:Token.create', token);
        return token.id;
      });

      debug('setAuthorized: token:', token);

      // check session.orgId
      if (req.session && req.session.orgId) {

        let orgId = req.session.orgId;
        delete req.session.orgId;

        let orgAccount = yield stapiOrgAccount(req).find({
          orgId: orgId,
          accountId: account.id
        });

        if (orgAccount.length === 0) {

          yield stapiOrgAccount(req).save({
            orgId: orgId,
            accountId: account.id,
            name: account.name
          });

        }
      }

      let redirectUrl;

      if (req.session && req.session.returnTo) {
        redirectUrl = req.session.returnTo;
        delete req.session.returnTo;
      } else {
        redirectUrl = '/';
      }

      debug('setAuthorized: redirectUrl:', redirectUrl);
      return res.redirect(redirectUrl + '#/?access-token=' + token);

    }).catch((err) => {
      debug('setAuthorized:catch:', err.data || err);
      return res.sendStatus(500);
    });

  };
}

