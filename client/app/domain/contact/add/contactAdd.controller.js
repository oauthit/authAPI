'use strict';

(function () {

  angular.module('authApiApp')
    .controller('ContactAddCtrl', function ($state,
                                            $scope,
                                            $q,
                                            Invite,
                                            Auth,
                                            SettingsService,
                                            ErrorsService,
                                            FormlyConfigService,
                                            InviteService,
                                            messageService,
                                            InitCtrlService) {

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

      function acceptInvite(invite) {

        if (!invite) {
          invite = vm.inviteByCode;
        }

        invite.acceptorId = SettingsService.getCurrentAgent().id;

        Invite.save(invite).then(function () {
          $state.go('debt.contact.list');
        }, function (err) {
          ErrorsService.addError(err);
        });

      }

      angular.extend(vm, {

        invitesWaitingForAccept: [],
        model: {},
        fields: FormlyConfigService.getConfigFieldsByKey('contactAdd'),

        getInviteByCode: getInviteByCode,

        acceptInvite: acceptInvite,

        buttons: [{
          name: 'Issue an invite',
          fn: InviteService.create
        }, {
          name: 'Add friends',
          sref: 'debt.contact.socialFriends'
        }]

      });

      vm.busySocialFriends = $q(function (resolve, reject) {
        Auth.getCurrentUser(function (acc) {
          Invite.findAll({inviteeId: acc.profileId}, {bypassCache: true}).then(function (invites) {
            _.each(invites, function (invite) {
              Invite.loadRelations(invite, ['inviter']).then(function (i) {
                vm.invitesWaitingForAccept.push(i);
              },function (res) {console.log (res);});
            });
            resolve();
          }, function () {
            reject();
          });
        });
      });

      InitCtrlService.init(vm, $scope);
    });
}());
