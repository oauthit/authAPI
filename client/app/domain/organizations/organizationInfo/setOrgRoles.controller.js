(function () {
  'use strict';

  angular.module('authApiApp')
    .controller('OrgRolesController', function (schema, $scope) {

      var vm = this;
      vm.roles = [];

      var OrgRole = schema.model('OrgRole');
      var Role = schema.model('Role');

      OrgRole.findAll();
      OrgRole.bindAll({}, $scope, 'vm.orgRoles');

      Role.findAll({}, {bypassCache: true});
      Role.bindAll({}, $scope, 'vm.roles');

      $scope.refreshRoles = function (searchFor) {
        console.log(searchFor);
        return Role.findAll({searchFor: searchFor, searchFields: ['name']}, {bypassCache: true});
      };

      angular.extend(vm, {

        selectedRoles: []

      });

    })
  ;

})();
