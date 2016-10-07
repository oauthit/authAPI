"use strict";

import store from './storeSchema';

export default store.defineMapper('SocialAccount', {
  relations: {
    hasOne: {
      ProviderAccount: {
        foreignKey: 'providerAccountId',
        localField: 'providerAccount'
      }
    }
  }
});
