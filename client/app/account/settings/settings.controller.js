'use strict';

// TODO show and edit account data

function SettingsController($window,
                            $q,
                            Auth,
                            saFormlyConfigService,
                            schema,
                            saMessageService,
                            sabErrorsService) {

  var vm = this;

  const Account = schema.model('Account');
  const ProviderAccount = schema.model('ProviderAccount');

  Auth.getCurrentUser(function (account) {
    vm.originalModel = angular.copy(account);
    vm.model = account;
  });

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
    buttons: [
      {
        name: 'Manage agents',
        sref: 'auth.agent.manage'
      }
    ],

    socialProviders: [
      'facebook',
      'google',
      'twitter'
    ],
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
    },

    link: function (provider) {
      $window.location.href = '/auth/' + provider + '?accountId=' + vm.originalModel.id;
    },

    unlink: function (provider) {
      let providerAccountId = _.find(ProviderAccount.getAll(), {provider: provider}).id;
      ProviderAccount.destroy(providerAccountId).then(() => {
        init();
      });
    }

  });

  init();
}

angular.module('authApiApp')
  .controller('SettingsController', SettingsController);
