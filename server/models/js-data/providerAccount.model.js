"use strict";

import store from './store';
import findOrCreate from './findOrCreate';

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

const ProviderAccount = store.getMapper('ProviderAccount');
ProviderAccount.findOrCreate = findOrCreate;

export default ProviderAccount;
