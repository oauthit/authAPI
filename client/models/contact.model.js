'use strict';

(function () {

  angular.module('authApiApp')
    .factory('Contact', function (DS) {
      return DS.defineResource({
        name: 'contact'
      });
    })
    .run(function (Contact) {
    });

}());
