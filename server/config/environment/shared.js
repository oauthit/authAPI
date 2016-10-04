'use strict';

exports = module.exports = {
  // List of user roles
  userRoles: ['guest', 'user', 'admin'],
  STAPI: (process.env.STAPI || 'http://localhost:9000/api') + '/',
  smsAuth: {
    sistemium: {
      url: process.env.SMSAUTH
    },
    vseramki: {
      url: process.env.SMSAUTH
    }
  },
  POOL_NAME: 'aa'
};
