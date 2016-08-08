(function () {
  'use strict';

  angular.module('authApiApp')
    .controller('ProviderAppAccountsController', function ($q, $scope, $stateParams, Auth, InitCtrlService, schema) {

      let vm = InitCtrlService.setup(this);
      let providerAppId = $stateParams.providerId;
      let ProviderAccount = schema.model('ProviderAccount');
      let ProviderApp = schema.model('ProviderApp');

      ProviderApp.bindOne(providerAppId, $scope, 'vm.providerApp');
      ProviderAccount.bindAll({
        providerAppId: providerAppId
      }, $scope, 'vm.providerAccounts');

      ProviderApp.find(providerAppId);

      angular.extend(vm, {
        ngTable: {
          count: 12
        },
        providerApp: false,
        loginOauth: () => Auth.loginOauth(vm.providerApp)
      });

      function setupNgTable(providerAccounts) {

        vm.setupNgTable({
          getCount: function () {
            return $q.resolve(providerAccounts.length);
          },

          findAll: function () {
            return $q.resolve(providerAccounts);
          }
        });

      }

      vm.busy = ProviderAccount.findAll({providerAppId: providerAppId}, {bypassCache: true})
        .then((providerAccounts) => {
          setupNgTable(providerAccounts);
        });

    })
  ;

})();
