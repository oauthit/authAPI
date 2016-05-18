'use strict';

(function () {

  angular.module('authApiApp')
    .factory('InviteService', function (SettingsService,
                                        models,
                                        $state,
                                        sabErrorsService) {

      var Invite = models.invite;

      function create () {
        Invite.create({
          ownerAgentId: SettingsService.getCurrentAgent().id
        }).then(function (response) {
          $state.go('debt.invite.info', {
            id: response.id
          });
        }, function (err) {
          sabErrorsService.addError(err);
        });
      }

      return {
        create: create
      };

    })
  ;

}());
