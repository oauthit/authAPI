'use strict';

import {Container, Schema} from 'js-data';
import {HttpAdapter} from 'js-data-http-node';
var config = require('../../config/environment');

const adapter = new HttpAdapter({
  basePath: config.apiUrl + 'aa',
  httpConfig: {
    address: 'http://localhost',
    port: 9000
  },
  error: function (err) {
    console.log(err);
  }
});
const store = new Container();
store.registerAdapter('http', adapter, {default: true});

export default store;
