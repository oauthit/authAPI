'use strict';

var Waterline = require('waterline');

var ProviderAccount = Waterline.Collection.extend({
  tableName: 'providerAccount',
  connection: 'rest',

  attributes: {
    profile: 'string',
    provider: 'string',
    providerId: 'string'
  }

});

export default ProviderAccount;
