/**
 * Error responses
 */

'use strict';

module.exports[404] = function pageNotFound(req, res) {

  var statusCode = 404;
  var result = {
    status: statusCode
  };

  res.status(result.status);
  res.end('Not found');
};
