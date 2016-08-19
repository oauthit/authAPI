'use strict';

(function () {

  function OrgAccountController ($scope, $stateParams, schema, $q, saFormlyConfigService) {

    var orgAccountId = $stateParams.orgAccountId;
    var vm = this;

    var OrgAccount = schema.model('OrgAccount');
    var OrgAccountRole = schema.model('OrgAccountRole');
    var OrgRole = schema.model('OrgRole');
    var Role = schema.model('Role');

    function setUnusedRoles() {
      vm.unUsedRoles = _.difference(_.map(vm.orgRoles, 'role'), _.map(vm.orgAccountRoles, 'role'));
    }

    function onSelectRole(role) {
      var orgAccountRole = {
        orgId: vm.orgAccount.orgId,
        roleId: role.id,
        accountId: vm.orgAccount.accountId,
        orgAccountId: vm.orgAccount.id
      };
      OrgAccountRole.create(orgAccountRole);
    }

    function onRemoveRole(role) {
      OrgAccountRole.destroy(role.id);
    }

    function onSubmitEdit(orgAccountForm) {
      OrgAccount.update(vm.orgAccount, vm.orgAccount);
      orgAccountForm.$setPristine();
    }

    function undoOrgAccount() {
      OrgAccount.revert(vm.orgAccount);
    }

    function onCancelEdit(orgAccountForm) {
      undoOrgAccount();
      orgAccountForm.$setPristine();
    }

    _.assign(vm, {
      onSelectRole,
      onRemoveRole,
      onSubmitEdit,
      onCancelEdit,
      fields: saFormlyConfigService.getConfigFieldsByKey('OrgAccount.edit'),
    });


    vm.busy = OrgAccount.find(orgAccountId)
      .then(orgAccount => {

        var orgFilter = {orgId: orgAccount.orgId};
        var orgAccountFilter = {
          orgAccountId: orgAccountId
        };

        OrgAccount.bindOne(orgAccountId, $scope, 'vm.orgAccount');
        OrgRole.bindAll(orgFilter, $scope, 'vm.orgRoles', setUnusedRoles);
        OrgAccountRole.bindAll(orgAccountFilter, $scope, 'vm.orgAccountRoles', setUnusedRoles);

        return Role.findAll()
          .then(()=> $q.all([
            OrgRole.findAllWithRelations(orgFilter)('Role'),
            OrgAccountRole.findAll(orgAccountFilter)
          ]));

      })
      .catch(err => {
        console.error(err);
      });

    $scope.$on('$destroy', undoOrgAccount);

  }

  angular.module('authApiApp')
    .controller('OrgAccountController', OrgAccountController);

})();
