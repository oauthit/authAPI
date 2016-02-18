'use strict';

(function () {

  angular.module('authApiApp.services')
    .factory('ErrorsService', function () {
      var errors = [];

      function parseError(error) {

        if (error && error.data && error.data.length > 0) {
          error.data.forEach(function (errObj) {
            errors.push({
              type: 'danger',
              msg: errObj.message
            });
          });
        }

      }

      function addError(error) {
        parseError(error);
      }

      return {
        addError: addError,
        errors: errors
      };
    })
  ;

}());
