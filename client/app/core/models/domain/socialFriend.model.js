'use strict';

(function () {

  angular.module('authApiApp')
    .factory('SocialFriend', function (DS, appConfig) {
      return DS.defineResource({
        name: 'socialFriend',
        endpoint: 'facebook/friend',
        basePath: appConfig.apiUrl,
        relations: {
          hasMany: {
            invite: [{
              localField: 'invites',
              foreignKey: 'inviterSocialAccountId'
            },{
              localField: 'invitations',
              foreignKey: 'inviteeSocialAccountId'
            }]
          }
        },
        methods: {
          status: function () {
            if (this.invites && this.invites.length === 0 && this.invitations && this.invitations.length === 0) {
              return 'invite';
            } else if (_.find(this.invites, {'status': 'open'}) || _.find(this.invitations, {'status': 'open'})) {
              return 'waiting';
            } else if (_.find(this.invites, {'status': 'accepted'}) || _.find(this.invitations, {'status': 'accepted'})) {
              return 'accepted';
            }
          }
        }
      });
    })

    .run(function (SocialFriend) {
      console.log(SocialFriend);
    })
  ;

}());
