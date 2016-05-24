(function (ng) {
  'use strict';
  ng.module('authApiApp.admin')
    .service('OrgService', function (Schema) {

      let org = Schema().models().org;
      console.log(org);

    })
  ;

})(angular);
