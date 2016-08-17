'use strict';

(function () {

  angular.module('authApiApp.admin.models')
    .run(function (schema) {
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
    })
  ;

})();
