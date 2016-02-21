'use strict';

(function () {

  angular.module('authApiApp')
    .controller('ContactAddCtrl', function (
      $state,Invite,SettingsService,ErrorsService
    ) {

      var vm = this;

      function createInvite () {

        Invite.create({
          ownerId: SettingsService.getCurrentAgent().id
        }).then(function (response) {
          $state.go('debt.invite.info', {
            id: response.id
          });
        }, function (err) {
          ErrorsService.addError(err);
        });

      }

      angular.extend (vm,{

        buttons: [{
          name: 'Issue an invite',
          fn: createInvite
        }]

      });

    });
}());
