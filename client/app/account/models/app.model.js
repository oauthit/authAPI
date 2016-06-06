(function (ng) {
  'use strict';
  ng.module('authApiApp.admin.models')
    .run(function (schema) {
      schema.register({
        name: 'App',
        relations: {
          hasOne: {
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
