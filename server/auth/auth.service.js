'use strict';

import config from '../config/environment';
import compose from 'composable-middleware';
import Token from '../api/token/token.model';
var debug = require('debug')('authAPI:auth.service');
import account from '../models/account.model.js';
var Account = account();
import providerAccount from '../models/providerAccount/providerAccount.model.js';
var ProviderAccount = providerAccount();
import _ from 'lodash';
import winston from 'winston';
import uuid from 'node-uuid';


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

  Token.findById(token).then((user) => {
    //debug ('validateAuth', 'user:', user);
    winston.log('info', `Successfully found token for user: ${user}`);
    req.user = user;
    winston.log('debug', `req.user = ${user}`);
    next();
  }, (err) => {
    winston.log('info', `Error occured while trying to find token by id(Token.findById(${token})).`);
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
 * Set token cookie directly for oAuth strategies
 *
 * @params {Request} req - Express Request object
 * @params {Response} res - Express Response object
 */
export function setAuthorized(req, res) {
  //debug ('User:', req.user);
  if (_.isEmpty(req.authInfo)) {
    //TODO think of how to create
    let account = req.query.state;
    if (account) {

      Account.findById(account)
        .then((data) => {
          req.user.accountId = account;
          ProviderAccount.save(req.user)
            .then(function () {
              Token.save(data)
                .then(() => {
                  return res.redirect('/#/account');
                }, function () {
                  return res.redirect('/#/setupAccount');
                })
              ;
            }, function () {
              return res.redirect('/#/setupAccount');
            })
          ;
        }, function () {
          return res.redirect('/#/setupAccount');
        })
        .catch(function () {
          return res.redirect('/#/setupAccount');
        })
      ;
    } else {
      //TODO for now create account here
      let user = req.user;
      account = {
        id: uuid.v4(),
        name: user.name,
        roles: user.roles
      };
      Account.save(account)
        .then(function (account) {
          user.accountId = account.id;
          ProviderAccount.save(user)
            .then(function () {
              Token.save(account)
                .then(token => {
                    debug(token);
                    return res.redirect('/#/?access-token=' + token)
                  }
                )
              ;
            });
        });
    }
  } else {
    debug('AuthInfo:', req.authInfo);
    res.redirect('/#/?access-token=' + req.authInfo);
  }
}

