/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/token              ->  index
 * POST    /api/token              ->  create
 * GET     /api/token/:id          ->  show
 * PUT     /api/token/:id          ->  update
 * DELETE  /api/token/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Token from './token.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a single Token from the DB
export function show(req, res) {
  let token = req.params.id || req.headers.authorization;
  Token.findById(token)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}
