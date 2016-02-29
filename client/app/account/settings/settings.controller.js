'use strict';

// TODO show and edit account data

function SettingsController (Auth, FormlyConfigService){

  var vm = this;

  angular.extend(vm, {

    model: Auth.getCurrentUser(),
    fields: FormlyConfigService.getConfigFieldsByKey('accountInfo'),
    buttons: [
      {
        name: 'Manage agents',
        sref: 'debt.agent.manage'
      }
    ]

  });

}

angular.module('authApiApp')
  .controller('SettingsController', SettingsController);
