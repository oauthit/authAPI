'use strict';

exports = module.exports = {
  // List of user roles
  userRoles: ['guest', 'user', 'admin'],
  STAPI: (process.env.STAPI || 'http://localhost:9000/api') + '/',
  smsAuth: {
    url: process.env.SMSAUTH || 'http://localhost:4000'
  }
};
