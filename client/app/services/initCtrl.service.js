'use strict';

(function () {

  angular.module('authApiApp.services')
    .factory('InitCtrlService', function () {

      function init (ctrl) {

        return ctrl;

      }

      return {
        init: init
      };

    })
  ;

}());
