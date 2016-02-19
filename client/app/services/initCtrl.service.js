'use strict';

(function () {

  angular.module('authApiApp.services')
    .factory('InitCtrlService', function () {

      function init (scope) {

        return scope;

      }

      return {
        init: init
      };

    })
  ;

}());
