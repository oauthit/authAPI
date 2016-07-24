'use strict';

(function () {

  angular.module('authApiApp.admin.models')
    .run(function (schema) {
      schema.register({
        name: 'ProviderApp',
        relations: {
          hasMany: {
            OrgProviderApp: {
              foreignKey: 'providerAppId',
              localField: 'orgProviderApps'
            },
            ProviderAccount: {
              foreignKey: 'providerAppId',
              localField: 'providerAccounts'
            }
          }
        }
      });
    })
  ;

})();
