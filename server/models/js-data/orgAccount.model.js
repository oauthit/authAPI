"use strict";

import store from './storeSchema';

export default store.defineMapper('OrgAccount', {
  relations: {
    hasOne: {
      Account: {
        foreignKey: 'accountId',
        localField: 'account'
      },
      Org: {
        foreignKey: 'orgId',
        localField: 'org'
      }
    }
  }
});
