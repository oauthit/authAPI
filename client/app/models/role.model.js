'use strict';

(function () {

  angular.module('authApiApp.admin.models')
    .run(function (schema) {

      schema.register({
        name: 'Role',
        relations: {
          hasMany: {
            OrgAccountRole: {
              foreignKey: 'roleId',
              localField: 'orgAccountRoles'
            }
          }
        }
      });
    })
  ;

})();
