'use strict';

(function () {

  angular.module('authApiApp')
    .controller('FriendsCtrl', function ($scope,
                                         $q,
                                         Invite,
                                         Invitee,
                                         Auth,
                                         messageService,
                                         InitCtrlService,
                                         ErrorsService) {

      var vm = this;
      vm.currentUserPromise = Auth.getCurrentUser();

      function init() {
        vm.busy = $q(function (resolve, reject) {
          $q.all([Invitee.findAll(), vm.currentUserPromise]).then(function (res) {

            vm.currentUser = res[1];
            vm.friends = [];

            var promises = [];
            _.each(res[0], function (r) {
              promises.push(Invitee.loadRelations(r, ['invites']).then(function () {
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
          var data = {
            ownerId: vm.agent.id,
            inviteeId: friend.id,
            inviterId: vm.currentUser.profileId
          };

          Invite.create(data).then(function () {
            messageService.success('Invite was sent to ' + friend.name, 'Invite sent');
          }, function (err) {
            ErrorsService.addError(err);
          });
        },

        showInviteButton: function (friend) {
          return friend.invites && friend.invites.length === 0;
        },

        showWaitingButton: function (friend) {
          return _.find(friend.invites, {'status': 'open'});
        }
      });

      InitCtrlService.init(vm, $scope);
      init();

    })
  ;

}());
