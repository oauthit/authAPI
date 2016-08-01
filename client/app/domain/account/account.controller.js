(function () {
  'use strict';

  angular.module('authApiApp')
    .controller('AccountController', function ($q,
                                               Auth,
                                               localStorageService,
                                               InitCtrlService,
                                               saFormlyConfigService,
                                               saMessageService,
                                               sabErrorsService,
                                               schema) {

      let vm = InitCtrlService.setup(this);

      angular.extend(vm, {
        ngTable: {
          count: 12
        },
        accessToken: localStorageService.get('access-token'),
        getRedirectUrl: function (url) {
          return `${url}?access-token=${vm.accessToken}`;
        }
      });

      const Account = schema.model('Account');
      const ProviderAccount = schema.model('ProviderAccount');
      const Org = schema.model('Org');
      const App = schema.model('App');

      Auth.getCurrentUser(function (account) {
        vm.originalModel = angular.copy(account);
        vm.model = account;
      });

      /**
       * Get current account and his providerAccounts
       */
      function init() {
        vm.busy = Account.find('me').then(function (acc) {
          vm.acc = acc;

          vm.providerAccNgTableParams = vm.setupNgTable({
            getCount: function (params, options) {
              return ProviderAccount.getCount(angular.extend(params || {},{
                accountId: vm.acc.id
              }), options);
            },

            findAll: function () {
              return Account.loadRelations(vm.acc, ['ProviderAccount'])
                .then(function(acc){
                  return (vm.providerAccounts = acc.providerAccounts);
                })
                .catch(function (err) {
                  console.error(err);
                });
            }
          });

        }).catch(err => {
          console.error(err);
        });
      }

      vm.orgNgTableParams = vm.setupNgTable({
        getCount: Org.getCount,
        findAll: Org.findAll
      });

      vm.appNgTableParams = vm.setupNgTable({
        getCount: App.getCount,
        findAll: App.findAll
      });

      angular.extend(vm, {

        fields: saFormlyConfigService.getConfigFieldsByKey('accountInfo'),

        onCancel: function (form) {
          vm.model = angular.copy(vm.originalModel);
          form.$setPristine();
        },

        hasProviderLinked: function (provider) {
          return _.find(vm.providers, {provider: provider});
        },

        onSubmit: function () {
          var data = vm.model;
          Account.save(data).then(function () {
            saMessageService.success('Account have been updated', 'Success!');
          }, function (err) {
            sabErrorsService.addError(err);
          });
        }

      });

      init();

    });
})();
