'use strict';

(function () {
  angular.module('authApiApp.admin.models')
    .run(function (schema) {
      schema.register({
        name: 'App',
        relations: {
          hasMany: {
            OrgApp: {
              foreignKey: 'appId',
              localField: 'apps'
            }
          }
        }
      });
    })
  ;

})();
