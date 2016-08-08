'use strict';

(function () {

  angular.module('authApiApp.core.services')
    .factory('Auth', function (saAuth, schema, saToken, $window) {

      var config = {
        authUrl: '',
        Account: schema.model('Account')
      };

      let Auth = saAuth(config);

      angular.extend(Auth, {
        getCurrentRoles: function () {
          //TODO api route for currentRoles
        },
        loginOauth: function(providerApp) {
          if (!providerApp) {
            return console.error('Auth.loginOauth providerApp undefined');
          }
          var href = `/auth/${providerApp.provider}/${providerApp.name}`;
          var token = saToken.get();
          if (token) {
            href += `?access_token=${token}`;
          }
          $window.location.href = href;
        }
      });

      return Auth;

    })
  ;

})();
