'use strict';

(function () {

  angular.module('authApiApp.core.directives')
    .directive('dButtons', function () {
      return {
        restrict: 'AC',
        require: 'dButton',
        templateUrl: 'app/core/directives/dButtons/dButtons.html',
        scope: {
          buttons: '='
        }
      };
    })
  ;

}());
