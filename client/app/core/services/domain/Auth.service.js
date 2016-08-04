'use strict';

(function () {

  angular.module('authApiApp.core.services')
    .factory('Auth', function (saAuth,schema) {

      var config = {
        authUrl: '',
        Account: schema.model('Account')
      };

      let Auth = saAuth(config);
      angular.extend(Auth, {
        getCurrentRoles: function () {
          //TODO api route for currentRoles
        },
      });

      return Auth;

    })
  ;

})();
