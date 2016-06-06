"use strict";

import store from './store';
import {findOrCreate} from './findOrCreate';

store.defineMapper('Org', {
  relations: {
    hasMany: {
      OrgProviderApp: {
        foreignKey: 'orgId',
        localField: 'orgProviderApps'
      },
      App: {
        foreignKey: 'orgId',
        localField: 'apps'
      }
    }
  }
});

const org = store.getMapper('Org');
org.findOrCreate = findOrCreate;

export default org;
