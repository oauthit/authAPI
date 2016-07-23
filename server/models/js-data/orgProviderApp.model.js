"use strict";

import store from './store';
import {findOrCreate} from './findOrCreate';

store.defineMapper('OrgProviderApp', {
  relations: {
    hasOne: {
      ProviderApp: {
        foreignKey: 'providerAppId',
        localField: 'providerApp'
      },
      Org: {
        foreignKey: 'orgId',
        localField: 'org'
      }
    }
  }
});

const orgProviderApp = store.getMapper('OrgProviderApp');
orgProviderApp.findOrCreate = findOrCreate;

export default orgProviderApp;
