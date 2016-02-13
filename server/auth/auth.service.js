'use strict';

import config from '../config/environment';
import compose from 'composable-middleware';
import Token from '../api/token/token.model';

var debug = require('debug') ('authAPI:auth.service');

var validateAuth = (req,res,next) => {

  let token = req.headers.authorization;

  debug ('validateAuth','token:',token);

  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  Token.findById(token).then((user) => {
    req.user = user;
    next();
  }, (err) => {
    return res.status(401).send(err);
  })
};

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
export function isAuthenticated() {
  return compose()

    .use(function(req, res, next) {
      // allow authorization to be passed through query parameter as well
      debug ('isAuthenticated', 'query:', req.query);
      if (req.query && req.query.hasOwnProperty('authorization:')) {
        req.headers.authorization = req.query ['authorization:'];
      }
      validateAuth (req, res, next);
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
      if (req.user.roles.indexOf(roleRequired) > -1) {
        next();
      } else {
        res.status(403).send('Forbidden');
      }
    });
}


/**
 * Set token cookie directly for oAuth strategies
 */
export function setAuthorized(req, res) {
  debug ('User:', req.user);
  debug ('AuthInfo:', req.authInfo);
  res.redirect('/#/?access-token=' + req.authInfo);
}
