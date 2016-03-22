'use strict';

(function () {

  angular.module('authApiApp')
    .controller('FriendsCtrl', function ($scope,
                                         $q,
                                         Invite,
                                         SocialFriend,
                                         Auth,
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
              promises.push(SocialFriend.loadRelations(r, ['invites']).then(function () {
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
            ownerAgentId: vm.agent.id,
            inviteeId: friend.id,
            inviterId: vm.currentUser.currentProviderAccountId
          };

          Invite.create(data).then(function () {
            messageService.success('Invite was sent to ' + friend.name, 'Invite sent');
          }, function (err) {
            ErrorsService.addError(err);
          });
        }

      });

      InitCtrlService.init(vm, $scope);
      init();

    })
  ;

}());
