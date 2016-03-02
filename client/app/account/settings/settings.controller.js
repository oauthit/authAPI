'use strict';

// TODO show and edit account data

function SettingsController(Auth, FormlyConfigService, Account, messageService, ErrorsService) {

  var vm = this;

  Auth.getCurrentUser(function (account) {
    vm.originalModel = angular.copy(account);
    vm.model = account;
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

    onSubmit: function () {
      Account.create(vm.model).then(function () {
        messageService.success('Account have been updated', 'Success!');
      }, function (err) {
        ErrorsService.addError(err);
      });
    }

  });

}

angular.module('authApiApp')
  .controller('SettingsController', SettingsController);
