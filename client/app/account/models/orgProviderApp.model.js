(function (ng) {
  'use strict';
  ng.module('authApiApp.admin.models')
    .run(function (Schema) {
      Schema.register({
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
