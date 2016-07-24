'use strict';

(function () {

  angular.module('authApiApp.admin')
    .service('OrgService', function (schema) {

      var org = schema().models().org;
      console.log(org);

    })
  ;

})();
