'use strict';

import {Container, Schema} from 'js-data';
import {HttpAdapter} from 'js-data-http-node';

var adapter = new HttpAdapter({
  basePath: '',
  httpConfig: {
    address: 'http:/localhost:9000',
    port: 9000
  }

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

console.log(store.getMapper('account').schema);

const ProviderSchema = new Schema({
  properties: {
    name: {type: 'string'}
  }
});

store.defineMapper('provider', {
  endpoint: '/provider',
  schema: ProviderSchema
});

store.getMapper('provider').schema === ProviderSchema;

store.findAll('account', {}).then(accounts => console.log(accounts))
  .catch(err => {
    console.log(err);
  });
