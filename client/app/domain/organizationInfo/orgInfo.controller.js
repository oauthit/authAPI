(function () {
  'use strict';

  angular.module('authApiApp')
    .controller('OrgInfoController', function (schema, $state, $stateParams, $scope, Auth, Modal, saFormlyConfigService, sabNgTable) {

      var vm = this;

      var Org = schema.model('Org');
      var OrgAccount = schema.model('OrgAccount');

      var joinFields = saFormlyConfigService.getConfigFieldsByKey('OrgAccount.join');

      var stateFilter = {
        id: $state.params.orgId
      };

      if ($state.params.isPublic || /join$/.test($state.current.name)) {
        stateFilter.isPublic = true;
      }

      Org.findAll(stateFilter);
      Org.bindOne(stateFilter.id, $scope, 'vm.org');

      // TODO: secure routes that need currentUser with ui-router

      Auth.getCurrentUser(user => {

        var orgAccountFilter = {
          orgId: stateFilter.id,
          accountId: user.id
        };

        OrgAccount.findAll(orgAccountFilter, {bypassCache: true})
          .then(oa=> {
            vm.orgAccount = oa.length && oa[0] ||
              OrgAccount.createInstance(angular.extend(orgAccountFilter, {
                name: user.name
              }));
          });

      });

      var orgAccountsNgTableCtrl = {
        ngTable: {}
      };

      angular.extend(vm, {

        joinFields: joinFields,
        orgAccountsNgTableCtrl: orgAccountsNgTableCtrl,

        join: ()=> OrgAccount.create(vm.orgAccount)
          .then(() => Org.find(stateFilter.id, {bypassCache: true})),

        leave: ()=> OrgAccount.destroy(vm.orgAccount)
          .then(() => Org.find(stateFilter.id, {bypassCache: true})),

        deleteClick: ()=> Modal.confirm.delete(
          ()=> Org.destroy(vm.org)
            .then(() => $state.go('auth.org'))
        )(vm.org.name),

        orgAccountsNgTable: sabNgTable.setup(orgAccountsNgTableCtrl, {
          findAll: (params, options) =>
            OrgAccount.findAll(_.assign(params, {orgId: stateFilter.id}), options),
          getCount: (params, options) =>
            OrgAccount.getCount(_.assign(params, {orgId: stateFilter.id}), options)
        })

      });

    });

})();
