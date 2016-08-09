(function () {
  'use strict';

  angular.module('authApiApp')
    .controller('OrgRolesController', function (schema, $scope) {

      var vm = this;

      var OrgRole = schema.model('OrgRole');
      console.log(OrgRole);

      OrgRole.findAll().then((orgRoles) => {
        console.log(orgRoles);
      });
      OrgRole.bindAll({}, $scope, 'vm.orgRoles');


      angular.extend(vm, {});

    })
  ;

})();
