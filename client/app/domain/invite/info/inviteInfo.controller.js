'use strict';

(function () {

  angular.module('authApiApp')
    .controller('InviteInfoCtrl', function (
      $scope,
      $stateParams,
      Invite,
      $state,
      ErrorsService
    ) {

      var vm = this;

      Invite.find($stateParams.id).then(function (invite) {
        console.log(invite);
      });

      Invite.bindOne($stateParams.id, $scope, 'vm.data');

      angular.extend(vm, {

        copyTarget: '#inviteCode',
        fields: Invite.fields,

        deleteInvite: function () {
          Invite.destroy(vm.data.id).then(function(){
            $state.go('debt.main');
          });
        },

        disableDeleteInvite: function () {
          return !vm.data || !vm.data.status || vm.data.status === 'accepted';
        },

        // TODO implement sms and email invite
        sms: function () {
          ErrorsService.addError ('Not implemented');
        },

        emailInvite: function () {
          ErrorsService.addError ('Not implemented');
        }

      });
    })
  ;

}());
