'use strict';

(function () {

  function OrgRolesController(schema, $scope, $stateParams) {

    var vm = this;

    var orgId = $stateParams.orgId;
    var Role = schema.model('Role');
    var OrgRole = schema.model('OrgRole');
    var Org = schema.model('Org');

    function deleteOrgRole(orgRole) {
      OrgRole.destroy(orgRole)
        .catch(err => {
          console.log(err);
        })
      ;
    }

    function saveOrgRole(role) {
      return OrgRole.create({
        roleId: role.id,
        orgId
      })
        .catch(err => {
          console.log(err);
        })
        ;
    }

    function saveRole(roleName) {

      return Role.create({
        name: roleName,
        //TODO think how to save code
        code: roleName,
        isPublic: false
      })
        .then(role => {
          return OrgRole.create({
            roleId: role.id,
            orgId
          }).then(() => {
            vm.selectedRoles = [];
          });
        })
        .catch(err => {
          console.log(err);
          vm.selectedRoles = [];
        });
    }

    function onSelectCallback(item) {
      saveOrgRole(item)
        .then(() => {
          vm.selectedRoles = [];
        });
    }

    _.assign(vm, {

      roles: [],
      selectedRoles: [],
      deleteOrgRole,
      onSelectCallback,
      saveRole

    });

    Org.find(orgId);
    Org.bindOne(orgId, $scope, 'vm.org');

    vm.refreshRoles = () => {
      // TODO: fetch other roles
    };

    function setUnusedRoles() {
      vm.unUsedRoles = _.difference(vm.roles, _.map(vm.orgRoles, 'role'));
    }

    Role.bindAll({}, $scope, 'vm.roles', setUnusedRoles);
    OrgRole.bindAll({orgId: orgId}, $scope, 'vm.orgRoles', setUnusedRoles);

    Role.findAll({}, {bypassCache: true})
      .then(()=>OrgRole.findAllWithRelations({orgId: orgId})('Role'));

  }

  angular.module('authApiApp')
    .controller('OrgRolesController', OrgRolesController);

})();
