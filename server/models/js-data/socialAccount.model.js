"use strict";

import store from './store';
import {Schema} from 'js-data';

const socialAccountSchema = new Schema({
  properties: {
    name: {type: 'string'},
    email: {
      type: 'string',
      uniqueItems: true
    }
  }

});

store.defineMapper('socialAccount', {
  relations: {
    hasMany: {
      providerAccount: {
        foreignKey: 'socialAccountId',
        localField: 'providerAccount'
      }
    }
  }
});

export default store.getMapper('socialAccount');
