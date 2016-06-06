"use strict";

import store from './store';
import {findOrCreate} from './findOrCreate';

store.defineMapper('OrgApp', {
  relations: {
    hasOne: {
      Org: {
        foreignKey: 'orgId',
        localField: 'orgProviderApp'
      },
      App: {
        foreignKey: 'appId',
        localField: 'app'
      }
    }
  }
});

const org = store.getMapper('Org');
org.findOrCreate = findOrCreate;

export default org;
