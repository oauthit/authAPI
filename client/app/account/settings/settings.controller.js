'use strict';

// TODO show and edit account data

function SettingsController($window, $q, Auth, FormlyConfigService, Account, messageService, ErrorsService) {

  var vm = this;

  Auth.getCurrentUser(function (account) {
    vm.originalModel = angular.copy(account);
    vm.model = account;
  });

  /**
   * Get current account and his providerAccounts
   */
  vm.busy = $q(function (resolve, reject) {
    Account.find('me').then(function (acc) {
      Account.loadRelations(acc, ['providerAccount']).then(function () {
          vm.providers = _.map(acc.providers, provider => {
            return provider.provider;
          });
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

  angular.extend(vm, {

    fields: FormlyConfigService.getConfigFieldsByKey('accountInfo'),
    buttons: [
      {
        name: 'Manage agents',
        sref: 'debt.agent.manage'
      }
    ],
    onCancel: function (form) {
      vm.model = angular.copy(vm.originalModel);
      form.$setPristine();
    },

    hasProviderLinked: function (provider) {
      return _.indexOf(vm.providers, provider) > -1;
    },

    onSubmit: function () {
      var data = {
        name: vm.model.name
      };
      Account.create(data).then(function () {
        messageService.success('Account have been updated', 'Success!');
      }, function (err) {
        ErrorsService.addError(err);
      });
    },

    link: function (provider) {
      $window.location.href = '/auth/' + provider + '?account=' + vm.originalModel.id;
    }

  });

}

angular.module('authApiApp')
  .controller('SettingsController', SettingsController);
