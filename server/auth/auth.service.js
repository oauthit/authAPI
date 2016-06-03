'use strict';

import config from '../config/environment';
import compose from 'composable-middleware';
var debug = require('debug')('authAPI:auth.service');
import _ from 'lodash';
import winston from 'winston';
import uuid from 'node-uuid';
import {model} from '../models/js-data/modelsSchema.service';
import co from 'co';

const Account = model('account');
const ProviderAccount = model('providerAccount');
const SocialAccount = model('socialAccount');
const Token = model('token');
const ProviderApp = model('providerApp');

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
    winston.log('info', 'Token is not defined, sending unauthorized status.');
    return res.sendStatus(401);
  }

  debug('token:', token);
  Token.find(token).then((user) => {
    //debug ('validateAuth', 'user:', user);
    winston.log('info', `Successfully found token for user: ${user}`);
    req.user = user;
    winston.log('debug', `req.user = ${user}`);
    next();
  }, (err) => {
    winston.log('info', `Error occured while trying to find token by id(Token.find(${token})).`);
    winston.log('debug', `Error message: ${err}`);
    return res.sendStatus(401);
  })
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
    })
}

/**
 * Checks if the user role meets the minimum requirements of the route
 *
 * @params {String} roleRequired - Parameter for role name
 */
export function hasRole(roleRequired) {
  if (!roleRequired) {
    winston.warn(`roleRequired parameter missing...`);
    throw new Error('Required role needs to be set');
  }

  return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
      if (req.user.roles[roleRequired] || req.user.roles.indexOf(roleRequired) > -1) {
        winston.info(`User have role '${roleRequired}'`);
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
    debug('User:', req.user);

    co(function *() {
      let providerApp = yield ProviderApp.findAll({"code": providerCode})
        .then((providerApps) => {

          if (providerApps.length === 1)
            return providerApps[0];

          else {
            debug('Error:', `No such provider app with code: ${providerCode}`);
            throw new Error(`No such provider: ${providerCode}`);
          }
        });

      debug('providerApp:', providerApp);

      let socialAccount = yield SocialAccount.findOrCreate(req.user.socialAccountId, req.user);
      debug('socialAccount:', socialAccount);
      let providerAccount = yield new Promise((fulfil, reject) => {
        //TODO teach stapi to take js-data query for relations
        //SocialAccount.find(socialAccount.id, {with: ['providerAccount']})

        ProviderAccount.findAll({socialAccountId: socialAccount.id})
          .then(providerAccounts => {
            debug('providerAccounts:', providerAccounts);
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
              ProviderAccount.create(providerAccount)
                .then(providerAccount => {
                  return fulfil(providerAccount);
                }, err => {
                  debug('providerAccount could not be created, err:', err);
                  return reject(err);
                })
              ;
            } else {
              return fulfil(providerAccounts[0]);
            }
          }, err => {
            debug('error occurred while getting provider accounts:', err);
            reject(err);
          });
      });

      debug('providerAccount:', providerAccount);
      let account = yield Account.findOrCreate(providerAccount.accountId, providerAccount);

      debug('account:', account);
      debug('providerAccount:', Object.assign({}, {accountId: account.id}, providerAccount));

      yield ProviderAccount.update(providerAccount.id, Object.assign({}, {accountId: account.id}, providerAccount));
      let token = yield Token.create({tokenInfo: account}).then(token => {
        return token.id;
      });
      debug('token:', token);

      return res.redirect('/#/?access-token=' + token);
    }).catch((err) => {
      debug('error occurred:', err);
      return res.sendStatus(500);
    });

  }
}

