(function (ng) {
  'use strict';
  ng.module('authApiApp.admin.models')
    .run(function (Schema) {
      Schema.register({
        name: 'orgProvider',
        relations: {
          belongsTo: {
            org: {
              localField: 'org',
              localKey: 'orgId'
            },
            provider: {
              localField: 'provider',
              localKey: 'providerId'
            }
          }
        }
      });
    })
  ;

})(angular);
