'use strict';

angular.module('authApiApp', [
  'authApiApp.auth',
  'authApiApp.admin',
  'authApiApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'validation.match'
])
  .config(function($urlRouterProvider) {
    $urlRouterProvider
      .otherwise('/');
  });
