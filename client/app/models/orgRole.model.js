'use strict';

(function () {

  angular.module('authApiApp.admin.models')
    .run(function (schema) {

      schema.register({
        name: 'OrgRole',
        relations: {
          hasOne: {
            Role: {
              foreignKey: 'roleId',
              localField: 'role'
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
