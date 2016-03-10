'use strict';

(function () {

  angular.module('authApiApp')
    .factory('Inviter', function (DS, appConfig) {
      return DS.defineResource({
        name: 'inviter',
        endpoint: 'facebook/friend',
        basePath: appConfig.apiUrl,
        relations: {
          hasOne: {
            invite: {
              localField: 'inviter',
              foreignKey: 'inviterId'
            }
          }
        }
      });
    })

    .run(function (Inviter) {
      console.log(Inviter);
    })
  ;

}());
