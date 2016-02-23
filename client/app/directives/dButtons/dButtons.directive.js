 'use strict';

 (function () {

   angular.module('authApiApp')
    .directive('dButtons', function () {
      return {
        restrict: 'AE',
        templateUrl: 'app/directives/dButtons/dButtons.html',
        scope: {
          buttons: '=',
          classes: '@'
        }
      };
    })
   ;

 }());
