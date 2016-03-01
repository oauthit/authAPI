'use strict';

(function (ng) {

  ng.module('authApiApp.directives')
    .directive('dInputWithAddon', function () {
      return {

        restrict: 'AC',
        templateUrl: 'app/core/directives/dInputWithAddon/dInputWithAddon.html',
        replace: true,
        scope: {
          dSelectModel: '=',
          dInputModel: '=',
          dLabelProp: '@',
          dValueProp: '@',
          dSelectOptions: '='
        },

        controller: function ($scope) {

          var vm = this;
          vm.setActiveItem = function (item) {
            $scope.dSelectModel = item;
          };

        },
        controllerAs: 'vm'

      };
    })
  ;

})(angular);
