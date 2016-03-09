'use strict';

(function () {

  angular.module('authApiApp')
    .controller('FriendsCtrl', function ($scope,
                                         $q,
                                         Invite,
                                         FacebookFriend,
                                         messageService,
                                         InitCtrlService,
                                         ErrorsService) {

      var vm = this;

      function init() {
        vm.busy = FacebookFriend.findAll().then(function (res) {

          vm.friends = [];

          _.each(res, function (r) {
            FacebookFriend.loadRelations(r, ['invites']).then (function (){
              vm.friends.push (r);
            });
          });

        });
      }

      angular.extend(vm, {

        inviteSocialFriend: function (friend) {
          var data = {
            ownerId: vm.agent.id,
            inviteeId: friend.id
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
