'use strict';

import {Container, Schema} from 'js-data';
import {HttpAdapter} from 'js-data-http-node';

var adapter = new HttpAdapter({
  basePath: '',
  url: 'http:/localhost:9000'

});
const store = new Container();
store.registerAdapter('http', adapter, {default: true});

store.defineMapper('account', {
  endpoint: '/account',
  basePath: 'http:/localhost:9000/aa',
  schema: {
    properties: {
      name: {type: 'string'}
    }
  }
});

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

store.getMapper('provider').schema === ProviderSchema;

export default store;
