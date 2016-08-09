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

      Role.findAll();
      Role.bindAll({}, $scope, 'vm.roles');

      angular.extend(vm, {

        refreshRoles: function (searchFor) {
          return Role.findAll({searchFor: searchFor, searchFields: ['name']});
        },
        selectedRoles: []

      });

    })
  ;

})();
