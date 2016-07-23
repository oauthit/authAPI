(function (ng) {
  'use strict';
  ng.module('authApiApp.admin.models')
    .run(function (schema) {
      schema.register({
        name: 'ProviderAccount',
        relations: {
          hasOne: {
            Account: {
              foreignKey: 'accountId',
              localField: 'account'
            },
            ProviderApp: {
              foreignKey: 'providerAppId',
              localField: 'providerApp'
            }
          }
        }
      });
    })
  ;

})(angular);
