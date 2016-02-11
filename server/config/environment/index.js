'use strict';

var path = require('path');
var _ = require('lodash');
var restAdapter = require('sails-rest');
var diskAdapter = require('sails-disk');

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
  port: process.env.PORT || 9090,

  // Server IP
  ip: process.env.IP || '0.0.0.0',

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'auth-api-secret'
  },

  facebook: {
    clientID:     process.env.FACEBOOK_ID || 'id',
    clientSecret: process.env.FACEBOOK_SECRET || 'secret',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/facebook/callback'
  },

  twitter: {
    clientID:     process.env.TWITTER_ID || 'id',
    clientSecret: process.env.TWITTER_SECRET || 'secret',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/twitter/callback'
  },

  google: {
    clientID:     process.env.GOOGLE_ID || 'id',
    clientSecret: process.env.GOOGLE_SECRET || 'secret',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/google/callback'
  },

  waterline: {
    adapters: {
      disk: diskAdapter,
      rest: restAdapter
    },
    connections: {
      rest: {
        adapter: 'rest',
        host:     'localhost:9000',  // api host
        protocol: 'http',            // api HTTP protocol
        pathname: '/api/opr',                 // api endpoint path name
        headers:  {},                // Optional HTTP headers
        hooks: {
          merge:    true,            // flag that indicates whether or not to merge build-in hooks with user-provided hooks
          before:   [],              // array of hook functions that run before a request
          after:    [
            function (err, res, cb) {
              if (res.statusCode === 401) {
                return cb('Unauthorized!');
              }
              cb();
            }
          ]               // array of hook functions that run after a request
        }
      },
      localDisk: {
        adapter: 'disk'
      }
    },

    defaults: {
      migrate: 'alter'
    }
  }
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./shared'),
  require('./' + process.env.NODE_ENV + '.js') || {});
