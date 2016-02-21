'use strict';

(function () {

  angular.module('authApiApp')
    .controller('InviteInfoCtrl', function (
      $scope,
      $stateParams,
      Invite,
      $state
    ) {

      var vm = this;

      Invite.find($stateParams.id).then(function (invite) {
        console.log(invite);
      });

      Invite.bindOne($stateParams.id, $scope, 'vm.data');

      angular.extend(vm, {

        copyTarget: '#formly_1_input_code_2',
        fields: Invite.fields,

        onSuccess: function (e) {
          console.log(e);
        },

        deleteInvite: function () {
          Invite.destroy(vm.data.id).then(function(){
            $state.go('debt.main');
          });
        }

      });
    })
  ;

}());
