(function () {
  'use strict';

  angular.module('authApiApp')
    .controller('OrgInfoController', function (schema, $state, $stateParams, $scope, Auth, Modal, $q, saFormlyConfigService, sabNgTable, SettingsService) {

      var vm = this;

      var Org = schema.model('Org');
      var OrgAccount = schema.model('OrgAccount');
      var OrgApp = schema.model('OrgApp');
      var OrgProviderApp = schema.model('OrgProviderApp');

      var joinFields = saFormlyConfigService.getConfigFieldsByKey('OrgAccount.join');
      var orgId = $state.params.orgId;

      var stateFilter = {
        id: orgId
      };

      if ($state.params.isPublic || /join$/.test($state.current.name)) {
        stateFilter.isPublic = true;
      }

      var roleFilter = {
        orgId
      };

      Auth.getOrgRolesForCurrentUser(roleFilter.orgId).then((roles) => {
        roles = roles.map((role) => role.code);
        vm.isOrgAdmin = Auth.isOrgAdmin(roles);
      });

      Org.findAll(stateFilter);
      Org.bindOne(orgId, $scope, 'vm.org');

      // TODO: secure routes that need currentUser with ui-router

      var user = Auth.getCurrentUser();

      var orgAccountFilter = {
        orgId,
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
        orgId,

        orgAccountsNgTableCtrl: orgAccountsNgTableCtrl,
        orgAppsNgTableCtrl: orgAppsNgTableCtrl,
        orgProviderAppsNgTableCtrl: orgProviderAppsNgTableCtrl,

        join: ()=> OrgAccount.create(vm.orgAccount)
          .then(() => Org.find(stateFilter.id, {bypassCache: true}))
          .then((org) => SettingsService.setCurrentOrg(org))
          .then(() => $state.go('auth.org.info', {orgId: stateFilter.id})),

        leave: ()=> OrgAccount.destroy(vm.orgAccount)
          .then(() => Org.find(stateFilter.id, {bypassCache: true}))
          .then(() => SettingsService.setCurrentOrg())
          .then(() => $state.go('auth.org')),

        deleteClick: ()=> Modal.confirm.delete(
          ()=> Org.destroy(vm.org)
            .then(() => $state.go('auth.org'))
        )(vm.org.name),

        orgAccountsNgTable: sabNgTable.setup(orgAccountsNgTableCtrl, {
          findAll: (params, options) => {
            params = _.assign(params, {orgId: stateFilter.id});
            return OrgAccount.findAllWithRelations(params, options)('OrgAccountRole')
              .then(res => {
                console.log(res);
                return res;
              });
          },
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
