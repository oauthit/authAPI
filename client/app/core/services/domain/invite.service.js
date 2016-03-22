'use strict';

(function () {

  angular.module('authApiApp')
    .factory('InviteService', function (SettingsService, Invite, $state, ErrorsService) {

      function create () {
        Invite.create({
          ownerAgentId: SettingsService.getCurrentAgent().id
        }).then(function (response) {
          $state.go('debt.invite.info', {
            id: response.id
          });
        }, function (err) {
          ErrorsService.addError(err);
        });
      }

      return {
        create: create
      };

    })
  ;

}());
