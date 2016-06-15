(function () {
  'use strict';

  angular.module('authApiApp')
    .controller('ProviderAppAccountsController', function ($q, $stateParams, $window, InitCtrlService, schema, providerAccounts, providerApp) {

      let vm = InitCtrlService.setup(this);

      angular.extend(vm, {
        ngTable: {
          count: 12
        },
        providerApp: providerApp,
        loginOauth: function(provider) {
          $window.location.href = '/auth/' + provider;
        }
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

      if (!providerAccounts) {

        let ProviderAccount = schema.model('ProviderAccount');

        ProviderAccount.findAll({providerAppId: $stateParams.providerId}, {bypassCache: true})
          .then((providerAccounts) => {
            setupNgTable(providerAccounts);
          })
        ;

      } else {
        setupNgTable(providerAccounts);
      }

    })
  ;

})();
