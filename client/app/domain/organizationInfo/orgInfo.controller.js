(function () {
  'use strict';

  angular.module('authApiApp')
    .controller('OrgInfoController', function (org) {

      var vm = this;

      angular.extend(vm, {
        org: org
      });

    })
  ;

})();
