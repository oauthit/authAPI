"use strict";

import store from './store';
import {findOrCreate} from './findOrCreate';

store.defineMapper('OrgAccount', {
  relations: {
    hasOne: {
      Account: {
        foreignKey: 'accountId',
        localField: 'account'
      },
      Org: {
        foreignKey: 'orgId',
        localField: 'org'
      }
    }
  }
});

const orgAccount = store.getMapper('OrgAccount');
orgAccount.findOrCreate = findOrCreate;

export default orgAccount;
