(function (ng) {
  'use strict';
  ng.module('authApiApp.admin.models')
    .run(function (Schema) {
      Schema.register({
        name: 'org',
        relations: {
          hasMany: {
            orgProvider: {
              localField: 'orgProvider',
              foreignKey: 'orgProviderId'
            }
          }
        }
      });
    })
  ;

})(angular);
