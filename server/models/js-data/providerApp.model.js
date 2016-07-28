"use strict";

import store from './storeSchema';

export default store.defineMapper('ProviderApp', {
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
