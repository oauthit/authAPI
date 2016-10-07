"use strict";

import store from './storeSchema';

export default store.defineMapper('OrgProviderApp', {
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
