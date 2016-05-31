(function (ng) {
  'use strict';
  ng.module('authApiApp.admin')
    .service('OrgService', function (schema) {

      let org = schema().models().org;
      console.log(org);

    })
  ;

})(angular);
