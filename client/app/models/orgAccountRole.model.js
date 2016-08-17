'use strict';

(function () {

  angular.module('authApiApp.admin.models')
    .run(function (schema) {

      schema.register({
        name: 'OrgAccountRole',
        relations: {
          hasOne: {
            Account: {
              localKey: 'accountId',
              localField: 'account'
            },
            Org: {
              localKey: 'orgId',
              localField: 'org'
            },
            Role: {
              localKey: 'roleId',
              localField: 'role'
            },
            OrgAccount: {
              localKey: 'orgAccountId',
              localField: 'orgAccount'
            }
          }
        }
      });


    })
  ;

})();
