'use strict';

(function () {

  angular.module('authApiApp')
    .controller('FriendsCtrl', function ($scope,
                                         $q,
                                         Invite,
                                         SocialFriend,
                                         Auth,
                                         ProviderAccount,
                                         SocialAccount,
                                         messageService,
                                         InitCtrlService,
                                         ErrorsService) {

      var vm = this;
      vm.currentUserPromise = Auth.getCurrentUser();

      function init() {
        vm.busy = $q(function (resolve, reject) {
          $q.all([SocialFriend.findAll(), vm.currentUserPromise]).then(function (res) {

            vm.currentUser = res[1];
            vm.friends = [];

            var promises = [];
            _.each(res[0], function (r) {
              promises.push(SocialFriend.loadRelations(r).then(function () {
                vm.friends.push(r);
              }));
            });
            $q.all(promises).then(function () {
              resolve();
            }, function () {
              reject();
            });

          });
        });
      }

      angular.extend(vm, {

        inviteSocialFriend: function (friend) {
          //TODO make it possible to choose provider with which to invite
          let providerAccount = _.first(ProviderAccount.getAll());
          let inviterId = providerAccount.profileId;
          let provider = providerAccount.provider;

          SocialAccount.findAll({profileId: friend.id, provider: provider}).then((inviteeSocialAccount) => {
            SocialAccount.findAll({profileId: inviterId, provider: provider}).then((inviterSocialAccount) => {
              let data = {
                ownerAgentId: vm.agent.id,
                inviteeSocialAccountId: inviteeSocialAccount[0].id,
                inviterSocialAccountId: inviterSocialAccount[0].id
              };

              Invite.create(data).then(function () {
                messageService.success('Invite was sent to ' + friend.name, 'Invite sent');
              }, function (err) {
                ErrorsService.addError(err);
              });
            });

          });

        }

      });

      InitCtrlService.init(vm, $scope);
      init();

    })
  ;

}());
