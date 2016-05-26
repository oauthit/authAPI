"use strict";

import store from './store';
import {Schema} from 'js-data';

//const accountSchema = new Schema({
//  properties: {
//    name: {type: 'string'},
//    email: {
//      type: 'string',
//      uniqueItems: true
//    }
//  },
//
//});

store.defineMapper('providerAccount', {
  relations: {
    hasOne: {
      account: {
        foreignKey: 'providerAccountId',
        localField: 'providerAccount'
      },
      socialAccount: {
        foreignKey: 'providerAccountId',
        localField: 'socialAccount'
      }
    }
  }
});

export default store.getMapper('providerAccount');
