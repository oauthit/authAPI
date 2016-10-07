"use strict";

import store from './storeSchema';

export default store.defineMapper('Org', {
  relations: {
    hasMany: {
      OrgProviderApp: {
        foreignKey: 'orgId',
        localField: 'orgProviderApps'
      },
      OrgApp: {
        foreignKey: 'orgId',
        localField: 'apps'
      }
    }
  }
});
