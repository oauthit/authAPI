'use strict';

(function () {

  angular.module('authApiApp')
    .directive('typeaheadFocus', function () {
      return {
        require: 'ngModel',
        link: function (scope, element, attr, ctrl) {
          element.bind('click', function () {
            ctrl.$setViewValue(' ' );
          });
          element.bind('focus', function () {
            ctrl.$setViewValue(' ');
          });
          element.bind('blur', function () {
            ctrl.$setViewValue('');
          });
        }
      };
    });

}());
