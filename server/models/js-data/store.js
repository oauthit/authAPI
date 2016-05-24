'use strict';

import {Container, Schema} from 'js-data';
import {HttpAdapter} from 'js-data-http-node';

const adapter = new HttpAdapter({
  basePath: 'http://localhost:9000/api/aa',
  httpConfig: {
    address: 'http://localhost',
    port: 9000
  }
});
const store = new Container();
store.registerAdapter('http', adapter, {default: true});

const ProviderSchema = new Schema({
  properties: {
    name: {type: 'string'}
  }
});

store.defineMapper('provider', {
  endpoint: '/provider',
  basePath: 'http:/localhost:9000/aa',
  schema: ProviderSchema
});

export default store;
