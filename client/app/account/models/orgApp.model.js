(function (ng) {
  'use strict';
  ng.module('authApiApp.admin.models')
    .run(function (schema) {
      schema.register({
        name: 'OrgApp',
        relations: {
          hasOne: {
            App: {
              foreignKey: 'appId',
              localField: 'apps'
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

})(angular);
