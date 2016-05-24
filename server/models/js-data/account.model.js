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
  beforeFindAll() {
    console.log('beforeFindAll');
  }
});

store.defineMapper('account', {
  schema: accountSchema
});

export default store.getMapper('account');
