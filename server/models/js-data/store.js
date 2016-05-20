'use strict';

import {Container, Schema} from 'js-data';
import {HttpAdapter} from 'js-data-http-node';

var adapter = new HttpAdapter({
  basePath: '',
  httpConfig: {
    address: 'http:/localhost',
    port: 9000
  },
  url: 'http:/localhost:9000'

});
const store = new Container();
store.registerAdapter('http', adapter, {default: true});

export function Account() {
  return store.defineMapper('account', {
    endpoint: '/account',
    basePath: 'http:/localhost:9000/aa',
    schema: {
      properties: {
        name: {type: 'string'},
        email: {
          type: 'string',
          uniqueItems: true
        }
      },
      required: ['email', 'name']
      //TODO write validations and virtual properties
    }
  });
}

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

export function getStore() {
  return store;
};
