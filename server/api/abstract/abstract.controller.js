'use strict';

function controller(model) {

  function respondWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function (entity) {
      if (entity) {
        res.status(statusCode).json(entity);
      } else {
        res.status(404).end();
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
  function index(req, res) {
    model.find()
      .then(respondWithResult(res))
      .catch(handleError(res));
  }

  function show(req, res) {
    model.findById(req.params.id)
      .then(respondWithResult(res))
      .catch(handleError(res))
    ;
  }

  return {
    index: index,
    show: show
  };
}

export default controller;


