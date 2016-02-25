'use strict';

(function () {

  angular.module('authApiApp')
    .controller('InviteListCtrl', function (
      $scope,
      $state,
      $q,
      Invite,
      InitCtrlService
    ) {

      var vm = InitCtrlService.setup (this);

      function onSetAgent (agent) {

        vm.invites = [];
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

        onSetAgent: onSetAgent,

        deleteInvite: function () {
          Invite.destroy(vm.data.id).then(function(){
            $state.go('debt.main');
          });
        }

      });

      InitCtrlService.init (vm,$scope);

    })
  ;

}());
