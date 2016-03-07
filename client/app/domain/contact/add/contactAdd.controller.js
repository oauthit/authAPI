'use strict';

(function () {

  angular.module('authApiApp')
    .controller('ContactAddCtrl', function ($state,
                                            Invite,
                                            SettingsService,
                                            ErrorsService,
                                            FormlyConfigService,
                                            InviteService) {

      var vm = this;

      function getInviteByCode() {

        var query = {
          code: vm.model.inviteCode
        };

        ErrorsService.clear();

        vm.busy = Invite.findAll(query, {bypassCache: true}).then(function (response) {

          if (!response.length) {
            return ErrorsService.addError('No invite with code "' + query.code + '"');
          }

          vm.inviteByCode = response[0];
          vm.inviteFields = [{
            key: 'ownerName.name',
            type: 'input',
            templateOptions: {
              type: 'text',
              disabled: true,
              label: 'Invite owner'
            }
          }];
        }, function (err) {
          ErrorsService.addError(err);
        });

      }

      function acceptInvite() {

        vm.inviteByCode.acceptorId = SettingsService.getCurrentAgent().id;
        Invite.save(vm.inviteByCode).then(function () {
          $state.go('debt.contact.list');
        }, function (err) {
          ErrorsService.addError(err);
        });

      }

      angular.extend(vm, {

        model: {},
        fields: FormlyConfigService.getConfigFieldsByKey('contactAdd'),

        getInviteByCode: getInviteByCode,

        acceptInvite: acceptInvite,

        buttons: [{
          name: 'Issue an invite',
          fn: InviteService.create
        }]

      });

    });
}());
