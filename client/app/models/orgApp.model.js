'use strict';

(function () {

  angular.module('authApiApp.admin.models')
    .run(function (schema) {
      schema.register({
        name: 'OrgApp',
        relations: {
          hasOne: {
            App: {
              localKey: 'appId',
              localField: 'app'
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
