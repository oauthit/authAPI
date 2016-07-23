'use strict';

import store from './store';
import {findOrCreate} from './findOrCreate';

store.defineMapper('App', {
  relations: {
    hasMany: {
      OrgApp: {
        foreignKey: 'appId',
        localField: 'orgs'
      }
    }
  }
});

const app = store.getMapper('App');
app.findOrCreate = findOrCreate;

export default app;
