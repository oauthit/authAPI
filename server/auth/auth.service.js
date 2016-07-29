'use strict';

import compose from 'composable-middleware';
var debug = require('debug')('authAPI:auth:service');
import {model, models} from '../models/js-data/storeSchema';
import co from 'co';

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
var validateAuth = (req, res, next) => {

  let token = req.headers.authorization;

  //debug ('validateAuth','token:',token);

  if (!token) {
    debug('info', 'Token is not defined, sending unauthorized status.');
    return res.sendStatus(401);
  }

  debug('token:', token);
  Token.find(token).then((user) => {
    //debug ('validateAuth', 'user:', user);
    debug('info', `Successfully found token for user: ${JSON.stringify(user)}`);
    req.user = user;
    debug('debug', `req.user = ${user}`);
    next();
  }, (err) => {
    debug('info', `Error occured while trying to find token by id(Token.find(${token})).`);
    debug('debug', `Error message: ${err}`);
    return res.sendStatus(401);
  });
};

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 401
 */
export function isAuthenticated() {
  return compose()

    .use(function (req, res, next) {
      // allow authorization to be passed through query parameter as well
      //debug ('isAuthenticated', 'query:', req.query);
      if (req.query && req.query.hasOwnProperty('authorization:')) {
        req.headers.authorization = req.query ['authorization:'];
      }
      validateAuth(req, res, next);
    });
}

/**
 * Checks if the user role meets the minimum requirements of the route
 *
 * @params {String} roleRequired - Parameter for role name
 */
export function hasRole(roleRequired) {
  if (!roleRequired) {
    debug(`roleRequired parameter missing...`);
    throw new Error('Required role needs to be set');
  }

  return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
      if (req.user.roles[roleRequired] || req.user.roles.indexOf(roleRequired) > -1) {
        debug(`User have role '${roleRequired}'`);
        next();
      } else {
        res.status(403).end('Forbidden');
      }
    });
}

/**
 *
 * @param providerCode {String} - Unique providerCode
 * @returns {Function}
 */
export function setAuthorized(providerCode) {
  /**
   * Set token cookie directly for oAuth strategies
   *
   * @params {Request} req - Express Request object
   * @params {Response} res - Express Response object
   */

  return function (req, res) {

    debug('setAuthorized user:', req.user);
    debug('setAuthorized session:', req.session);

    co(function* () {

      let providerAppPromise = ProviderApp.findAll({'code': providerCode})
        .then((providerApps) => {

          if (providerApps.length === 1)
            return providerApps[0];

          else {
            debug('Error:', `No such provider app with code: ${providerCode}`);
            throw new Error(`No such provider: ${providerCode}`);
          }
        });

      let providerApp = yield providerAppPromise;

      debug('providerApp:', providerApp);

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


      let account = yield Account.findOrCreate(providerAccount.accountId, {
        name: providerAccount.name,
        roles: providerAccount.roles
      });
      debug('setAuthorized: account:', account);

      providerAccount = Object.assign({}, providerAccount, {accountId: account.id});
      debug('setAuthorized: providerAccount:', providerAccount);

      yield ProviderAccount.update(providerAccount.id, providerAccount);
      let token = yield Token.create({tokenInfo: account}).then(token => {
        debug('setAuthorized:Token.create', token);
        return token.id;
      });

      debug('setAuthorized: token:', token);

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

