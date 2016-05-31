(function (ng) {
  'use strict';
  ng.module('authApiApp.admin.models')
    .run(function (schema) {
      schema.register({
        name: 'org',
        relations: {
          hasMany: {
            orgProvider: {
              localField: 'orgProvider',
              foreignKey: 'orgProviderId'
            }
          }
        }
      });
    })
  ;

})(angular);
