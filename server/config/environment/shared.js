'use strict';

exports = module.exports = {
  // List of user roles
  userRoles: ['guest', 'user', 'admin'],
  jsDataBasePath: 'http://localhost:9000/api/opr/',
  STAPI: (process.env.STAPI || 'http://localhost:9000/api') + '/'
};
