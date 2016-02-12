'use strict';

import config from '../config/environment';
import compose from 'composable-middleware';


var debug = require('debug') ('authAPI:auth.service');

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
export function isAuthenticated() {
  return compose()
    // Validate jwt
    .use(function(req, res, next) {
      // allow access_token to be passed through query parameter as well
      if (req.query && req.query.hasOwnProperty('authorization:')) {
        req.headers.authorization = req.query['authorization:'];
      } else if (true) {

      }
      //validateJwt(req, res, next);
    })
    // Attach user to request
    .use(function(req, res, next) {
      //User.findByIdAsync(req.user._id)
      //  .then(user => {
      //    if (!user) {
      //      return res.status(401).end();
      //    }
      //    req.user = user;
      //    next();
      //  })
      //  .catch(err => next(err));
    });
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
      if (req.user[roleRequired]) {
        next();
      } else {
        res.status(403).send('Forbidden');
      }
      //if (config.userRoles.indexOf(req.user.role) >=
      //    config.userRoles.indexOf(roleRequired)) {
      //  next();
      //} else {
      //  res.status(403).send('Forbidden');
      //}
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
