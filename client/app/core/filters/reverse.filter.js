'use strict';

(function () {

  angular.module('authApiApp.core.filters')
    .filter('reverse', function () {
      return function (items) {
        if (!angular.isArray(items)) {
          return false;
        }
        return items.slice().reverse();
      };
    });

}());
