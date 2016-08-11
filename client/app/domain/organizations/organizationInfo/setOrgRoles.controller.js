(function () {
  'use strict';

  angular.module('authApiApp')
    .controller('OrgRolesController', function (schema, $scope, $stateParams) {

      var vm = this;
      vm.roles = [];
      var orgId = $stateParams.orgId;
      var Role = schema.model('Role');
      var OrgRole = schema.model('OrgRole');
      var Org = schema.model('Org');

      function onDeleteOrg(role) {
        console.log(role);
        Role.destroy(role);
      }

      function saveOrgRole(role) {
        return OrgRole.create({
          roleId: role.id,
          orgId
        });
      }

      function onSelectCallback(item) {
        saveOrgRole(item)
          .then(() => {
            vm.orgRoles.push(item);
            _.remove(vm.roles, (role) => {
              return role.id === item.id;
            });
            vm.selectedRoles = [];
          })
          .catch(err => {
            console.log(err);
            vm.selectedRoles = [];
          })
        ;
      }

      angular.extend(vm, {

        selectedRoles: [],
        onDeleteOrg,
        onSelectCallback

      });

      Org.find(orgId);
      Org.bindOne(orgId, $scope, 'vm.org');

      $scope.refreshRoles = (searchFor) => {
        return Role.filter({
          where: {
            name: {
              'likei': searchFor
            }
          }
        });
      };

      OrgRole.findAllWithRelations({orgId: orgId})('Role')
        .then(orgRoles => {
          console.log(orgRoles);
          return vm.orgRoles = _.map(orgRoles, 'role')
        })
        .then(() => {
          Role.findAll({}, {bypassCache: true});
          Role.bindAll({}, $scope, 'vm.roles', function () {
            vm.roles = _.difference(vm.roles, vm.orgRoles);
          });
        })
      ;
    })
  ;

})();
