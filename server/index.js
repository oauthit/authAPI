'use strict';

// Set default node environment to development
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

process.env.DEBUG_FD = 1;
process.env.DEBUG_COLORS= 'true';

if (env === 'development' || env === 'test') {
  // Register the Babel require hook
  require('babel-core/register');
}

// Export the application
//noinspection JSUnresolvedVariable
exports = module.exports = require('./app');
