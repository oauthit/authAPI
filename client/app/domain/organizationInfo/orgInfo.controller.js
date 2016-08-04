(function () {
  'use strict';

  angular.module('authApiApp')
    .controller('OrgInfoController', function (schema, $state, $stateParams, $scope, Auth, Modal, $q, saFormlyConfigService, sabNgTable) {

      var vm = this;

      var Org = schema.model('Org');
      var OrgAccount = schema.model('OrgAccount');
      var OrgApp = schema.model('OrgApp');
      var OrgProviderApp = schema.model('OrgProviderApp');

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

      var user = Auth.getCurrentUser();

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

      var orgAccountsNgTableCtrl = {
        ngTable: {}
      };

      var orgAppsNgTableCtrl = {
        ngTable: {}
      };

      var orgProviderAppsNgTableCtrl = {
        ngTable: {}
      };

      angular.extend(vm, {

        joinFields: joinFields,

        orgAccountsNgTableCtrl: orgAccountsNgTableCtrl,
        orgAppsNgTableCtrl: orgAppsNgTableCtrl,
        orgProviderAppsNgTableCtrl: orgProviderAppsNgTableCtrl,

        join: ()=> OrgAccount.create(vm.orgAccount)
          .then(() => Org.find(stateFilter.id, {bypassCache: true}))
          .then(() => $state.go('auth.org')),

        leave: ()=> OrgAccount.destroy(vm.orgAccount)
          .then(() => Org.find(stateFilter.id, {bypassCache: true}))
          .then(() => $state.go('auth.org')),

        deleteClick: ()=> Modal.confirm.delete(
          ()=> Org.destroy(vm.org)
            .then(() => $state.go('auth.org'))
        )(vm.org.name),

        orgAccountsNgTable: sabNgTable.setup(orgAccountsNgTableCtrl, {
          findAll: (params, options) =>
            OrgAccount.findAll(_.assign(params, {orgId: stateFilter.id}), options),
          getCount: (params, options) =>
            OrgAccount.getCount(_.assign(params, {orgId: stateFilter.id}), options)
        }),

        orgAppsNgTable: sabNgTable.setup(orgAppsNgTableCtrl, {
          findAll: (params, options) =>
            OrgApp.findAllWithRelations(_.assign(params, {orgId: stateFilter.id}), options)('App'),
          getCount: (params, options) =>
            OrgApp.getCount(_.assign(params, {orgId: stateFilter.id}), options)
        }),

        orgProviderAppsNgTable: sabNgTable.setup(orgProviderAppsNgTableCtrl, {
          findAll: (params, options) =>
            OrgProviderApp.findAllWithRelations(_.assign(params, {orgId: stateFilter.id}), options)('ProviderApp'),
          getCount: (params, options) =>
            OrgProviderApp.getCount(_.assign(params, {orgId: stateFilter.id}), options)
        })

      });

    });

})();
