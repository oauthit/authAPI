'use strict';

(function () {

  angular.module('authApiApp.core.services')
    .factory('Auth', function (saAuth, schema) {

      let Role = schema.model('Role');

      var config = {
        authUrl: '',
        Account: schema.model('Account')
      };

      let Auth = saAuth(config);
      angular.extend(Auth, {
        getOrgRolesForCurrentUser: (orgId) => {
          //TODO api route for currentRoles

          return Role.findAll({
            orgId
          });

        },
      });

      return Auth;

    })
  ;

})();
