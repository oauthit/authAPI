'use strict';

(function () {

  angular.module('authApiApp.directives')
    .directive('errorWidget', function () {

      return {

        restrict: 'A',
        templateUrl: 'app/core/directives/errorWidget/errorWidget.html',
        controllerAs: 'ctrl',

        // FIXME Unclosed alert shows on every page
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
