'use strict';

(function () {

  angular.module('authApiApp')
    .controller('InviteInfoCtrl', function ($scope,
                                            $stateParams,
                                            Invite) {

      var vm = this;

      Invite.find($stateParams.id).then(function (invite) {
        console.log(invite);
      });

      Invite.bindOne($stateParams.id, $scope, 'vm.data');

      angular.extend(vm, {
        fields: Invite.fields,
        onSuccess: function (e) {
          console.log(e);
        }
      });
    })
  ;

}());
