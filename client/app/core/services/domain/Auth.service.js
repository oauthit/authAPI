'use strict';

(function () {

  angular.module('authApiApp.core.services')
    .factory('Auth', function (saAuth,schema) {

      var config = {
        authUrl: '',
        Account: schema.model('Account')
      };

      return saAuth(config);

    })
  ;

})();
