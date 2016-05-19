'use strict';

(function () {

  angular.module('authApiApp')
    .controller('FriendsCtrl', function ($scope,
                                         $q,
                                         models,
                                         saAuth,
                                         saMessageService,
                                         InitCtrlService,
                                         sabErrorsService) {

      var vm = this;
      var Invite = models.invite;
      var FacebookFriend = models.facebookFriend;
      var GoogleFriend = models.googleFriend;
      var SocialFriend = models.socialFriend;
      var SocialAccount = models.socialAccount;
      var ProviderAccount = models.providerAccount;
      vm.currentUserPromise = saAuth.getCurrentUser();

      SocialFriend.findAll({}).then((res) => {
        console.log(res);
      });

      function init() {
        vm.busy = $q(function (resolve, reject) {
          $q.all([FacebookFriend.findAll(), GoogleFriend.findAll(), vm.currentUserPromise]).then(function (res) {

            vm.currentUser = res[2];
            vm.facebookFriends = [];
            vm.googleFriends = [];

            var promises = [];
            _.each(res[0], function (r) {
              //promises.push(FacebookFriend.loadRelations(r).then(function () {
                vm.facebookFriends.push(r);
              //}));
            });

            _.each(res[1], function (r) {
              vm.googleFriends.push(r);
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

        inviteSocialFriend: function (friend, provider) {
          //TODO make it possible to choose provider with which to invite
          let providerAccount = _.find(ProviderAccount.getAll(), {'provider': provider});
          let inviterId = providerAccount.profileId;

          SocialAccount.findAll({profileId: friend.id, provider: provider}).then((inviteeSocialAccount) => {
            SocialAccount.findAll({profileId: inviterId, provider: provider}).then((inviterSocialAccount) => {
              let data = {
                ownerAgentId: vm.agent.id,
                inviteeSocialAccountId: inviteeSocialAccount[0].id,
                inviterSocialAccountId: inviterSocialAccount[0].id
              };

              Invite.create(data).then(function () {
                saMessageService.success('Invite was sent to ' + friend.name, 'Invite sent');
              }, function (err) {
                sabErrorsService.addError(err);
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
