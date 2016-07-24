'use strict';

(function () {

  angular.module('authApiApp.core.services')
    .factory('Auth', function (saAuth) {
      var config = {
        authUrl: ''
      };
      return saAuth(config);
    })
  ;

})();
