'use strict';

(function () {

  function InviteCreateController($scope, InitCtrlService, InviteService) {

    var vm = InitCtrlService.setup(this);

    function createInvite () {
      InviteService.create();
    }

    angular.extend(vm, {
      onSetAgent: function (agent) {
        vm.agent = agent;
      },
      buttons: [
        {
          name: 'Create invite',
          fn: createInvite
        }
      ]
    });

    InitCtrlService.init(vm, $scope);

  }

  angular.module('authApiApp')
    .controller('InviteCreateCtrl', InviteCreateController);

}());
