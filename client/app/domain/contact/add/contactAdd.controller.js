'use strict';

(function () {

  angular.module('authApiApp')
    .controller('ContactAddCtrl', function ($state, Invite, SettingsService, ErrorsService) {

      var vm = this;

      // TODO We need a service with a createInvite () function to use it in inviteCreate.controller


      function createInvite() {

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

      function getInviteByCode() {

        var query = {
          code: vm.model.inviteCode
        };

        Invite.findAll(query, {bypassCache: true}).then(function (response) {
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
          $state.go('debt.contact.contacts');
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
          fn: createInvite
        }]

      });

    });
}());
