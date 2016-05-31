"use strict";

import store from './store';

store.defineMapper('ProviderAccount', {
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

export default store.getMapper('ProviderAccount');
