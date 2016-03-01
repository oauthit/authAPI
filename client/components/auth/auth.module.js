'use strict';

angular.module('authApiApp.auth', [
  'authApiApp.constants',
  'authApiApp.util',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  })
;
