'use strict';

export default function (schema) {
  'ngInject';
  schema.register({
    name: 'ProviderAccount',
    relations: {
      hasOne: {
        Account: {
          localKey: 'accountId',
          localField: 'account'
        },
        ProviderApp: {
          localKey: 'providerAppId',
          localField: 'providerApp'
        }
      }
    }
  });
}
