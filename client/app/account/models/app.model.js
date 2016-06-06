(function (ng) {
  'use strict';
  ng.module('authApiApp.admin.models')
    .run(function (schema) {
      schema.register({
        name: 'App',
        relations: {
          hasMany: {
            OrgApp: {
              foreignKey: 'appId',
              localField: 'orgApps'
            }
          }
        }
      });
    })
  ;

})(angular);
