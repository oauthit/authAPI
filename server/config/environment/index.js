'use strict';

var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 9080,

  // Server IP
  ip: process.env.IP || '0.0.0.0',

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'auth-api-secret'
  },

  redisConfig: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    url: process.env.REDIS_URL
  },

  redisSessionConfig: {
    prefix: 'authApiSess:',
    db: process.env.REDIS_DB || 7,
    ttl: process.env.SESSION_TTL || 24 * 3600
  },

  redisTables: {
    AUTH_TOKEN: 'AuthToken',
    PROVIDER_TOKEN: 'ProviderToken',
    FACEBOOK_FRIEND: 'FacebookFriend',
    FACEBOOK_PROFILE: 'FacebookProfile',
    GOOGLE_FRIEND: 'GoogleFriend',
    GOOGLE_PROFILE: 'GoogleProfile'
  },

  session: {
    type: 'RedisStore'
  },

  saaAppConfig: {
    authUrl: process.env.AUTH_URL || 'http://localhost:9080',
    authApiUrl: process.env.AUTH_API_URL || 'http://localhost:9080/api/'
  }
};

// Export the config object based on the NODE_ENV
// ==============================================
export default _.merge(
  all,
  require('./shared'),
  require('./' + process.env.NODE_ENV + '.js') || {});
