"use strict";

import store from './store';
import {Schema} from 'js-data';
import {findOrCreate} from './findOrCreate';
//
//const socialAccountSchema = new Schema({
//  properties: {
//    name: {type: 'string'},
//    email: {
//      type: 'string',
//      uniqueItems: true
//    }
//  }
//
//});

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

const socialAccount = store.getMapper('socialAccount');
socialAccount.findOrCreate = findOrCreate;

export default socialAccount;
