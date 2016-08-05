'use strict';

(function () {

  angular.module('authApiApp.admin.models')
    .run(function (schema) {

      schema.register({
        name: 'OrgAccountRole',
        relations: {
          hasOne: {
            Account: {
              foreignKey: 'accountId',
              localField: 'account'
            },
            Org: {
              foreignKey: 'orgId',
              localField: 'org'
            },
            Role: {
              foreignKey: 'roleId',
              localField: 'role'
            }
          }
        }
      });


    })
  ;

})();
