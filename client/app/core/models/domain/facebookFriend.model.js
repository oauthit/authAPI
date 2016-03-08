'use strict';

(function () {

  angular.module('authApiApp')
    .factory('FacebookFriend', function (DS, appConfig) {
      return DS.defineResource({
        name: 'facebookFriend',
        basePath: appConfig.apiUrl,
        endpoint: 'fb'
      });
    })

    .run(function (FacebookFriend) {})
  ;

}());
