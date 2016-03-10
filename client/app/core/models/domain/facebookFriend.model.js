'use strict';

(function () {

  angular.module('authApiApp')
    .factory('FacebookFriend', function (DS, appConfig) {
      return DS.defineResource({
        name: 'facebookFriend',
        endpoint: 'facebook/friend',
        basePath: appConfig.apiUrl,
        relations: {
          hasMany: {
            invite: {
              localField: 'invites',
              foreignKey: 'inviteeId'
            }
          }
        }
      });
    })

    .run(function (FacebookFriend) {
      console.log(FacebookFriend);
    })
  ;

}());
