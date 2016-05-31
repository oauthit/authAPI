"use strict";

import store from './store';

store.defineMapper('ProviderApp', {
  relations: {
    hasMany: {
      OrgProviderApp: {
        foreignKey: 'providerAppId',
        localField: 'orgProviderApps'
      },
      ProviderAccount: {
        foreignKey: 'providerAppId',
        localField: 'providerAccounts'
      }
    }
  }
});

export default store.getMapper('ProviderApp');
