'use strict';

(function () {

  angular.module('authApiApp.admin.models')
    .run(function (schema) {

      schema.register({
        name: 'OrgRole',
        relations: {
          hasOne: {
            Role: {
              localKey: 'roleId',
              localField: 'role'
            },
            Org: {
              localKey: 'orgId',
              localField: 'org'
            }
          }
        }
      });

    })
  ;

})();
