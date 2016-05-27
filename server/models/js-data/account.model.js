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

store.defineMapper('account', {
  schema: accountSchema,
  relations: {
    belongsTo: {
      providerAccount: {
        foreignKey: 'accountId',
        localField: 'providerAccount'
      }
    }
  }
});

const account = store.getMapper('account');
account.findOrCreate = findOrCreate;

export default account;
