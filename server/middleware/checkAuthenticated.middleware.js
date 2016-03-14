'use strict';

function onReject(response, status) {
  return function (err) {
    response.status(status || 500).end(err);
  }
}

export default function () {
  return function (req, res, next) {
    if (!req.user) {
      return onReject(res, 401) ('Unauthorized!');
    } else {
      next();
    }
  }
}
