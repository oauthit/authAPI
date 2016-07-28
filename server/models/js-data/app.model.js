'use strict';

import store from './storeSchema';

export default store.defineMapper('App', {
  relations: {
    hasMany: {
      OrgApp: {
        foreignKey: 'appId',
        localField: 'orgs'
      }
    }
  }
});
