'use strict';

(function() {

function authInterceptor($q, Token, Util) {

  return {

    // Add authorization token to headers
    request(config) {
      let token = Token.get();

      config.headers = config.headers || {};

      if (token) {
        config.headers.authorization = token;
      }

      return config;
    },

    // Intercept 401s and redirect you to login
    responseError(response) {

      if (response.status === 401) {
        //$state.go('login');
        Token.destroy();
      }
      return $q.reject(response);
    }

  };

}

angular.module('authApiApp.auth')
  .factory('authInterceptor', authInterceptor);

})();
