(function () {
  'use strict';

  angular.module('authApiApp')
    .controller('ProviderAppAccountsController', function ($q, saToken, $stateParams, $window, InitCtrlService, schema, providerAccounts, providerApp) {

      let vm = InitCtrlService.setup(this);

      angular.extend(vm, {
        ngTable: {
          count: 12
        },
        providerApp: providerApp,
        loginOauth: function(app) {
          var token = saToken.get();
          var href = `/auth/${app.provider}/${app.name}`;
          if (token) {
            href += `?access_token=${token}`;
          }
          $window.location.href = href;
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
