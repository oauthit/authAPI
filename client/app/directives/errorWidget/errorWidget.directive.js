'use strict';

(function () {

  angular.module('authApiApp.directives')
    .directive('errorWidget', function () {
      return {
        restrict: 'A',
        templateUrl: 'app/directives/errorWidget/errorWidget.html',
        controller: function (ErrorsService) {
          var vm = this;
          vm.errors =  ErrorsService.errors;
          vm.closeError = function (index) {
            vm.errors.splice(index, 1);
          };
        },
        controllerAs: 'ctrl'
      };
    });

}());
