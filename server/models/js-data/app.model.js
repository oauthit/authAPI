"use strict";

import store from './store';
import {Schema} from 'js-data';
import {findOrCreate} from './findOrCreate';

store.defineMapper('App', {
  schema: accountSchema,
  relations: {
    hasMany: {
      Org: {
        foreignKey: 'appId',
        localField: 'orgs'
      }
    }
  }
});

const app = store.getMapper('App');
app.findOrCreate = findOrCreate;

export default app;
