'use strict';

var debug = require('debug')('authAPI:middleware:checkAuthenticated');

function onReject(response, status) {
  return function (err) {
    response.status(status || 500).end(err);
  };
}

function ensureAuthenticated () {
  return function (req, res, next) {
    if (!req.user) {
      return res.sendStatus(401);
    } else {
      next();
    }
  };
}


function ensureItsMe (req, res, next) {

  if (!req.params) {
    req.params = {};
  }

  req.params.id = req.user && req.user.id;

  if (!req.params.id) {
    res.sendStatus(403);
  }

  debug ('ensureItsMe', req.params.id);

  next();

}

export {ensureAuthenticated, ensureItsMe};
