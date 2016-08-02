'use strict';

(function () {

  angular.module('authApiApp.admin.models')
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

})();
