(function (ng) {
  'use strict';
  ng.module('authApiApp.admin.models')
    .run(function (schema) {
      schema.register({
        name: 'Org',
        relations: {
          hasMany: {
            OrgProviderApp: {
              foreignKey: 'orgId',
              localField: 'orgProviderApps'
            }
          },
          hasOne: {
            OrgApp: {
              foreignKey: 'orgId',
              localField: 'orgApp'
            }
          }
        }
      });
    })
  ;

})(angular);
