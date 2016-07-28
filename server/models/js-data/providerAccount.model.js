"use strict";

import store from './storeSchema';

export default store.defineMapper('ProviderAccount', {
  relations: {
    hasOne: {
      Account: {
        foreignKey: 'accountId',
        localField: 'account'
      },
      ProviderApp: {
        foreignKey: 'providerAppId',
        localField: 'providerApp'
      }
    },
    hasMany: {
      SocialAccount: {
        foreignKey: 'providerAccountId',
        localField: 'socialAccounts'
      }
    }
  }
});
