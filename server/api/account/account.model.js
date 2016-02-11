'use strict';

var Waterline = require('waterline');

var Account = Waterline.Collection.extend({
  tableName: 'account',
  connection: 'rest',

  attributes: {
    name: 'string'
  }

});

export default Account;
