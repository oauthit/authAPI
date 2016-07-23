'use strict';

import {Container, Schema} from 'js-data';
import {HttpAdapter} from 'js-data-http-node';
var config = require('../../config/environment');

const adapter = new HttpAdapter({

  basePath: config.STAPI + 'aa',

  error: function (err) {
    console.error('models:js-data:error:', err);
  }

});

const store = new Container();
store.registerAdapter('http', adapter, {default: true});

export default store;
