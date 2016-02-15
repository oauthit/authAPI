'use strict';

(function() {

function UserResource($resource) {
  return $resource('/api/account/:id', {
    id: '@_id'
  }, {
    get: {
      method: 'GET',
      params: {
        id: 'me'
      }
    }
  });
}

angular.module('authApiApp.auth')
  .factory('User', UserResource);

})();
