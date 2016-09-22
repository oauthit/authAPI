/**
 * Main application file
 */

'use strict';

import express from 'express';
import config from './config/environment';
import http from 'http';
var redisHelper = require('sistemium-node').redisHelper;

//console.log(redisHelper);
redisHelper.setup(config.redisConfig);


var debug = require('debug');

debug.log = console.info.bind(console);

//todo extract to requireJsDataModels
import './models/js-data/account.model';
import './models/js-data/app.model';
import './models/js-data/org.model';
import './models/js-data/orgAccount.model';
import './models/js-data/orgApp.model';
import './models/js-data/orgProviderApp.model';
import './models/js-data/providerAccount.model';
import './models/js-data/providerApp.model';
import './models/js-data/providerToken.model';
import './models/js-data/socialAccount.model';
import './models/js-data/token.model';

// Setup server
var app = express();
var server = http.createServer(app);
require('./config/express')(app);
require('./routes')(app);

// Start server
function startServer() {
  app.angularFullstack = server.listen(config.port, config.ip, function () {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

setImmediate(startServer);

// Expose app
exports = module.exports = app;
