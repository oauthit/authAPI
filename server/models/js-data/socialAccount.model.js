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


store.defineMapper('SocialAccount', {
  relations: {
    hasOne: {
      ProviderAccount: {
        foreignKey: 'providerAccountId',
        localField: 'providerAccount'
      }
    }
  }
});

const socialAccount = store.getMapper('SocialAccount');
socialAccount.findOrCreate = findOrCreate;

export default socialAccount;
