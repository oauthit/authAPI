'use strict';

(function (ng) {

  ng.module('authApiApp.core', [
    'authApiApp.core.interceptors',
    'authApiApp.core.services',
    'authApiApp.core.models'
  ]);

})(angular);
