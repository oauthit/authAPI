'use strict';

(function () {

  angular.module('authApiApp.core.services')
    .factory('Auth', function (saAuth,schema) {

      var config = {
        authUrl: '',
        Account: schema.model('Account')
      };

      console.log(saAuth(config));
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
