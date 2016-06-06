"use strict";

import store from './store';
import {findOrCreate} from './findOrCreate';

store.defineMapper('OrgApp', {
  relations: {
    hasOne: {
      Org: {
        foreignKey: 'orgId',
        localField: 'org'
      },
      App: {
        foreignKey: 'appId',
        localField: 'app'
      }
    }
  }
});

const orgApp = store.getMapper('OrgApp');
org.findOrCreate = findOrCreate;

export default orgApp;
