'use strict';

(function () {

  angular.module('authApiApp')
    .controller('InviteListCtrl', function (
      $scope,
      Agent,
      Invite,
      $state,
      SettingsService
    ) {

      var vm = this;

      function setAgent(e,agent) {
        if (!agent) {
          return;
        }
        Invite.bindAll({ownerId: agent.id}, $scope, 'vm.invites');
        vm.busy = Invite.findAll({owner: agent},{bypassCache:true}).then(function () {
          //vm.invites = agent.invites;
        });
      }

      $scope.$on('current-agent', setAgent);
      setAgent(false, SettingsService.getCurrentAgent());

      angular.extend(vm, {

        deleteInvite: function () {
          Invite.destroy(vm.data.id).then(function(){
            $state.go('debt.main');
          });
        }

      });

    })
  ;

}());
