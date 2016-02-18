'use strict';

angular.module('authApiApp', [
  'authApiApp.auth',
  'authApiApp.admin',
  'authApiApp.constants',
  'authApiApp.models',
  'authApiApp.filters',
  'authApiApp.services',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
  'LocalStorageModule',
  'formly',
  'formlyBootstrap'
])
  .config(function($urlRouterProvider) {
    $urlRouterProvider
      .otherwise('/');
  })
  .config(function(localStorageServiceProvider) {
    localStorageServiceProvider
      .setPrefix('authAPI');
  })
  .run(function ($rootScope, InitService) {
    //subscribe for logged-in event
    $rootScope.$on('logged-in',function(){
      InitService.init();
    });
  });
;
