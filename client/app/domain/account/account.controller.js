(function () {
  'use strict';

  angular.module('authApiApp')
    .controller('AccountController', function ($q,
                                               $scope,
                                               InitCtrlService,
                                               saFormlyConfigService,
                                               saMessageService,
                                               sabErrorsService,
                                               schema) {

      let vm = InitCtrlService.setup(this);

      angular.extend(vm, {
        ngTable: {
          count: 12
        }
      });

      const Account = schema.model('Account');
      const ProviderAccount = schema.model('ProviderAccount');
      const Org = schema.model('Org');
      const App = schema.model('App');

      var fields = saFormlyConfigService.getConfigFieldsByKey('accountInfo');

      function undoChanges() {
        Account.revert(vm.account);
      }

      $scope.$on('$destroy', undoChanges);

      /**
       * Get current account and his providerAccounts
       */
      function init() {
        vm.busy = Account.find('me').then(function (acc) {

          vm.account = acc;

          vm.providerAccNgTableParams = vm.setupNgTable({
            getCount: function (params, options) {
              return ProviderAccount.getCount(angular.extend(params || {}, {
                accountId: vm.account.id
              }), options);
            },

            findAll: function () {
              return Account.loadRelations(vm.account, ['ProviderAccount'])
                .then(function (acc) {
                  return (vm.providerAccounts = acc.providerAccounts);
                })
                .catch(function (err) {
                  console.error(err);
                });
            }
          });

        }).catch(sabErrorsService.addError);
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

        fields: fields,

        onCancel: function (form) {
          undoChanges();
          form.$setPristine();
        },

        hasProviderLinked: function (provider) {
          return _.find(vm.providers, {provider: provider});
        },

        onSubmit: function (form) {
          Account.save(vm.account.id)
            .then(function () {
              saMessageService.success('Account have been updated', 'Success!');
              form.$setPristine();
            })
            .catch(sabErrorsService.addError);
        }

      });

      init();

    });
})();
