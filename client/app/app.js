'use strict';

angular.module('authApiApp', [
  'authApiApp.auth',
  'authApiApp.admin',
  'authApiApp.constants',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
  'LocalStorageModule',
  'js-data'
])
  .config(function($urlRouterProvider) {
    $urlRouterProvider
      .otherwise('/');
  })
  .config(function(localStorageServiceProvider) {
    localStorageServiceProvider
      .setPrefix('authAPI');
  })
  .config(function (DSProvider, DSHttpAdapterProvider) {
    angular.extend(DSProvider.defaults, {});
    angular.extend(DSHttpAdapterProvider.defaults, {
      basePath: 'http://localhost:9000/api/opr/'
    });
  })
;
