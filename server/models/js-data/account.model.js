"use strict";

import store from './store';
import {Schema} from 'js-data';

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

export default store.getMapper('account');
