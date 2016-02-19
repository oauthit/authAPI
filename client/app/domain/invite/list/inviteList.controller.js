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

      function setAgent(agent) {
        Invite.bindAll({ownerId: agent.id}, $scope, 'vm.invites');
        Invite.findAll({owner: agent},{bypassCache:true}).then(function () {
          //vm.invites = agent.invites;
        });
      }

      if (SettingsService.getCurrentAgent()) {
        setAgent(SettingsService.getCurrentAgent());
      }

      $scope.$on('current-agent', function (e, agent) {
        setAgent(agent);
      });

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
