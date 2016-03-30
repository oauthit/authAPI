'use strict';

import config from '../config/environment';
import compose from 'composable-middleware';
import Token from '../api/token/token.model';
var debug = require('debug')('authAPI:auth.service');
import account from '../api/account/account.model';
var Account = account();
import providerAccount from '../api/providerAccount/providerAccount.model';
var ProviderAccount = providerAccount();
import _ from 'lodash';
import uuid from 'node-uuid';

var validateAuth = (req, res, next) => {

  let token = req.headers.authorization;

  //debug ('validateAuth','token:',token);

  if (!token) {
    return res.status(401).end('Unauthorized');
  }

  Token.findById(token).then((user) => {
    //debug ('validateAuth', 'user:', user);
    req.user = user;
    next();
  }, (err) => {
    return res.status(401).end(err);
  })
};

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
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
 */
export function hasRole(roleRequired) {
  if (!roleRequired) {
    throw new Error('Required role needs to be set');
  }

  return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
      if (req.user.roles[roleRequired] || req.user.roles.indexOf(roleRequired) > -1) {
        next();
      } else {
        res.status(403).end('Forbidden');
      }
    });
}

/**
 * Set token cookie directly for oAuth strategies
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
