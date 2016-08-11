(function () {
  'use strict';

  angular.module('authApiApp')
    .controller('OrgRolesController', function (schema, $scope) {

      var vm = this;
      vm.roles = [];

      //var Org = schema.model('Org');

      var Role = schema.model('Role');

      Role.findAll({}, {bypassCache: true});
      Role.bindAll({}, $scope, 'vm.roles');

      $scope.refreshRoles = function (searchFor) {
        return Role.findAll({'searchFor:': searchFor, 'searchFields:': ['name']}, {bypassCache: true});
      };

      angular.extend(vm, {

        selectedRoles: []

      });

    })
  ;

})();
