"use strict";

import store from './store';
import {Schema} from 'js-data';
import {findOrCreate} from './findOrCreate';

const accountSchema = new Schema({
  properties: {
    name: {type: 'string'},
    email: {
      type: 'string',
      uniqueItems: true
    }
  },

});

store.defineMapper('Account', {
  schema: accountSchema,
  relations: {
    hasMany: {
      ProviderAccount: {
        foreignKey: 'accountId',
        localField: 'providerAccounts'
      }
    }
  }
});

const account = store.getMapper('Account');
account.findOrCreate = findOrCreate;

export default account;
