'use strict';

(function () {

  angular.module('authApiApp.core.services')
    .factory('ErrorsService', function () {
      var errors = [];

      function parseError(e) {

        var data = e && e.data && e.data.length > 0 && e.data ||
          [e]
        ;

        data.forEach(function (errObj) {
          errors.push({
            type: 'danger',
            msg: errObj.message || errObj
          });
        });

      }

      function addError(error) {
        parseError(error);
      }

      function clearErrors () {
        errors.splice(0,errors.length);
      }

      return {
        addError: addError,
        clear: clearErrors,
        errors: errors
      };
    })
  ;

}());
