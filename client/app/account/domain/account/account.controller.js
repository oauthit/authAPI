(function () {
  'use strict';

  angular.module('authApiApp')
    .controller('AccountController', function (saFormlyConfigService, saMessageService, sabErrorsService) {

      var vm = this;

      const Account = schema.model('Account');
      const ProviderAccount = schema.model('ProviderAccount');

      /**
       * Get current account and his providerAccounts
       */
      function init() {
        vm.busy = $q(function (resolve, reject) {
          Account.find('me').then(function (acc) {

            vm.acc = acc;

            Account.loadRelations(acc, ['ProviderAccount']).then(function () {
                vm.providerAccounts = acc.providerAccounts;

                resolve();
              })
              .catch(function (err) {
                console.log(err);
                reject();
              });
          }).catch(err => {
            console.log(err);
            reject();
          });
        });
      }

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
          var data = {
            name: vm.model.name
          };
          Account.create(data).then(function () {
            saMessageService.success('Account have been updated', 'Success!');
          }, function (err) {
            sabErrorsService.addError(err);
          });
        }

      });

      init();

    })
})();
