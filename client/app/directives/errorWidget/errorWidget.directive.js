'use strict';

(function () {

  angular.module('authApiApp.directives')
    .directive('errorWidget', function () {
      return {
        restrict: 'A',
        templateUrl: 'app/directives/errorWidget/errorWidget.html'
      }
    });

}());
