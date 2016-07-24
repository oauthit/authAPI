'use strict';

(function () {

  angular.module('authApiApp.admin.models')
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

})();
