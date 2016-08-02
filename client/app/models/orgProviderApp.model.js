'use strict';

(function () {

  angular.module('authApiApp.admin.models')
    .run(function (schema) {
      schema.register({
        name: 'OrgProviderApp',
        relations: {
          hasOne: {
            ProviderApp: {
              foreignKey: 'providerAppId',
              localField: 'providerApp'
            },
            Org: {
              foreignKey: 'orgId',
              localField: 'org'
            }
          }
        }
      });
    })
  ;

})();
