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
              foreignKey: 'inviterId'
            },{
              localField: 'invitations',
              foreignKey: 'inviteeId'
            }]
          }
        },
        methods: {
          status: function () {
            if (this.invites && this.invites.length === 0) {
              return 'invite';
            } else if (_.find(this.invites, {'status': 'open'})) {
              return 'waiting';
            } else if (_.find(this.invites, {'status': 'accepted'})) {
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
