'use strict';

(function () {

  angular.module('authApiApp')
    .factory('FacebookFriend', function (DS, appConfig) {
      return DS.defineResource({
        endpoint: 'facebook/friend',
        basePath: appConfig.apiUrl,
        name: 'facebookFriend',
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
    .factory('GoogleFriend', function (DS, appConfig) {
      return DS.defineResource({
        endpoint: 'google/friend',
        basePath: appConfig.apiUrl,
        name: 'googleFriend'
      });
    })
    .factory('SocialFriend', function (DS) {
      return DS.defineResource({
        name: 'socialFriend',
        relations: {
          belongsTo: {
            socialAccount: [{
              localField: 'ownerSocialAccount',
              localKey: 'ownerSocialAccountId'
            }]
          }
        }
      })
    })

    .run(function (SocialFriend, FacebookFriend, GoogleFriend) {
      console.log(SocialFriend);
      console.log(FacebookFriend);
      console.log(GoogleFriend);
    })
  ;

}());
