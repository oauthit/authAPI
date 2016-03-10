'use strict';

(function () {

  angular.module('authApiApp')
    .factory('Invitee', function (DS, appConfig) {
      return DS.defineResource({
        name: 'invitee',
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

    .run(function (Invitee) {
      console.log(Invitee);
    })
  ;

}());
