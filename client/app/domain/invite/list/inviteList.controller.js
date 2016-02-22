'use strict';

(function () {

  angular.module('authApiApp')
    .controller('InviteListCtrl', function (
      $scope,
      Agent,
      Invite,
      $state,
      SettingsService,
      $q
    ) {

      var vm = this;

      function setAgent(e,agent) {
        if (!agent) {
          return;
        }
        //Invite.bindAll({ownerId: agent.id}, $scope, 'vm.invites');
        vm.busy = Invite.findAll({ownerId: agent.id},{bypassCache:true}).then(function (res) {

          var qs = res.map(function(i){
            return Invite.loadRelations(i).then(function(){
              vm.invites.push(i);
            });
          });

          if (qs.length) {
            return $q.all(qs);
          }

        });
      }

      angular.extend(vm, {

        invites: [],

        deleteInvite: function () {
          Invite.destroy(vm.data.id).then(function(){
            $state.go('debt.main');
          });
        }

      });

      $scope.$on('current-agent', setAgent);
      setAgent(false, SettingsService.getCurrentAgent());

    })
  ;

}());
