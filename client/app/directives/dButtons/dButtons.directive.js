'use strict';

(function () {

  angular.module('authApiApp')
    .directive('dButtons', function () {
      return {
        restrict: 'AC',
        require: 'dButton',
        templateUrl: 'app/directives/dButtons/dButtons.html',
        scope: {
          buttons: '='
        }
      };
    })
  ;

}());
