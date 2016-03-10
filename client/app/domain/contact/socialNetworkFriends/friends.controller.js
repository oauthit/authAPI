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
        vm.busy = $q.all([Invitee.findAll(), vm.currentUserPromise]).then(function (res) {

          vm.currentUser = res[1];
          console.log(vm.currentUser);
          vm.friends = [];

          _.each(res[0], function (r) {
            Invitee.loadRelations(r, ['invites']).then (function (){
              vm.friends.push (r);
            });
          });

        });
      }

      angular.extend(vm, {

        inviteSocialFriend: function (friend) {
          var data = {
            ownerId: vm.agent.id,
            inviteeId: friend.id,
            inviterId: vm.currentUser
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
