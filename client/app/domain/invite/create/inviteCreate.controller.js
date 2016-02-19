'use strict';

(function () {

  function InviteCreateController(SettingsService) {

    var vm = this;
    vm.agent = SettingsService.getCurrentAgent();

  }

  angular.module('authApiApp')
    .controller('InviteCreateCtrl', InviteCreateController);

}());
