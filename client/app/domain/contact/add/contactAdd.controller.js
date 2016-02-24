'use strict';

(function () {

  angular.module('authApiApp')
    .controller('ContactAddCtrl', function ($state,
                                            Invite,
                                            SettingsService,
                                            ErrorsService,
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
        fields: [{
          key: 'inviteCode',
          type: 'input',
          templateOptions: {
            placeholder: 'Enter invite code',
            type: 'text',
            label: 'Invite code',
            required: true
          }
        }, {
          key: 'mobileNumber',
          type: 'input',
          templateOptions: {
            placeholder: 'Search by mobile number',
            type: 'text',
            disabled: true,
            label: 'Sms'
          }
        }, {
          key: 'email',
          type: 'input',
          templateOptions: {
            placeholder: 'Search by email',
            type: 'text',
            disabled: true,
            label: 'Email'
          }
        }],

        getInviteByCode: getInviteByCode,

        acceptInvite: acceptInvite,

        buttons: [{
          name: 'Issue an invite',
          fn: InviteService.create
        }]

      });

    });
}());
