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
      OrgApp: {
        foreignKey: 'orgId',
        localField: 'apps'
      }
    }
  }
});

const org = store.getMapper('Org');
org.findOrCreate = findOrCreate;

export default org;
