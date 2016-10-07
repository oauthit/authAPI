'use strict';

(function () {

  angular.module('authApiApp.admin.models')
    .run(function (schema) {
      schema.register({
        name: 'OrgProviderApp',
        relations: {
          hasOne: {
            ProviderApp: {
              localKey: 'providerAppId',
              localField: 'providerApp'
            },
            Org: {
              localKey: 'orgId',
              localField: 'org'
            }
          }
        }
      });
    })
  ;

})();
