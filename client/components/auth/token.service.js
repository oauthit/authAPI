'use strict';

(function() {

function TokenStore(localStorageService) {

  var KEY = 'access-token';

  var token = localStorageService.get(KEY);

  return {
    get: function () {
      return token;
    },

    save: function (newToken) {
      token = newToken;
      localStorageService.set (KEY,newToken);
    },

    destroy: function () {
      localStorageService.remove(KEY);
    }

  };

}

angular.module('authApiApp.auth')
  .service('Token', TokenStore);

})();
