"use strict";

import store from './storeSchema';

export default store.defineMapper('Account', {
  //schema: accountSchema,
  relations: {
    hasMany: {
      ProviderAccount: {
        foreignKey: 'accountId',
        localField: 'providerAccounts'
      },
      OrgAccount: {
        foreignKey: 'accountId',
        localField: 'orgAccounts'
      }
    }
  }
});
