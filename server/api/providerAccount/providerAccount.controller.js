/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/providerAccount              ->  index
 * POST    /api/providerAccount              ->  create
 * GET     /api/providerAccount/:id          ->  show
 * PUT     /api/providerAccount/:id          ->  update
 * DELETE  /api/providerAccount/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import ProviderAccount from './providerAccount.model';
import request from 'request';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of ProviderAccounts
export function index(req, res) {
  ProviderAccount.find()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function show(req, res) {
  if (req.params.id === 'me') {
    ProviderAccount.findOne({
        profileId: req.user.profileId
      })
      .then(respondWithResult(res))
      .catch(handleError(res));
  }
}
