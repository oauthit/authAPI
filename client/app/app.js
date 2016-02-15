'use strict';

angular.module('authApiApp', [
  'authApiApp.auth',
  'authApiApp.admin',
  'authApiApp.constants',
  'authApiApp.models',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
  'LocalStorageModule'
])
  .config(function($urlRouterProvider) {
    $urlRouterProvider
      .otherwise('/');
  })
  .config(function(localStorageServiceProvider) {
    localStorageServiceProvider
      .setPrefix('authAPI');
  })
;
