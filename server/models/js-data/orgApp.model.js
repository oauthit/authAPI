"use strict";

import store from './storeSchema';

export default store.defineMapper('OrgApp', {
  relations: {
    hasOne: {
      Org: {
        foreignKey: 'orgId',
        localField: 'org'
      },
      App: {
        foreignKey: 'appId',
        localField: 'app'
      }
    }
  }
});
