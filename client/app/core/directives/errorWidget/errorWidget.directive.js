'use strict';

(function () {

  angular.module('authApiApp.core.directives')
    .directive('errorWidget', function () {

      return {

        restrict: 'A',
        templateUrl: 'app/core/directives/errorWidget/errorWidget.html',
        controllerAs: 'ctrl',

        controller: function (ErrorsService) {
          var vm = this;
          vm.errors =  ErrorsService.errors;
          vm.closeError = function (index) {
            vm.errors.splice(index, 1);
          };
        }

      };

    });
}());
