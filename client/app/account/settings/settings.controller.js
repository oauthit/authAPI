'use strict';

// TODO show and edit account data

function SettingsController($window,
                            $q,
                            Auth,
                            saFormlyConfigService,
                            models,
                            Account,
                            saMessageService,
                            sabErrorsService) {

  var vm = this;
  var ProviderAccount = models.providerAccount;

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
        Account.loadRelations(acc, ['providerAccount']).then(function () {
            vm.providers = acc.providers;

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
        sref: 'debt.agent.manage'
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
      ProviderAccount.destroy(providerAccountId).then( _ => {
        init();
      });
    }

  });

  init();
}

angular.module('authApiApp')
  .controller('SettingsController', SettingsController);
