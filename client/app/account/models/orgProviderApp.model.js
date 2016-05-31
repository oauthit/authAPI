(function (ng) {
  'use strict';
  ng.module('authApiApp.admin.models')
    .run(function (schema) {
      schema.register({
        name: 'orgProviderApp',
        relations: {
          belongsTo: {
            org: {
              localField: 'org',
              localKey: 'orgId'
            },
            provider: {
              localField: 'providerApp',
              localKey: 'providerAppId'
            }
          }
        }
      });
    })
  ;

})(angular);
