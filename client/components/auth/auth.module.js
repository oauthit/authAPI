'use strict';

angular.module('authApiApp.auth', [
  'sistemiumBootstrap',
  'authApiApp.constants',
  'authApiApp.util',
  'ui.router',
  'authApiApp.core.models'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
