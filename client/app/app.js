'use strict';

(function () {

  angular.module('authApiApp.dependencies', [
    'ngResource',
    'ngSanitize',
    'ui.router',
    'ui.bootstrap',
    'validation.match',
    'LocalStorageModule',
    'formly',
    'formlyBootstrap',
    'ngclipboard',
    'angularMoment'
  ]);

  angular.module('authApiApp', [
      'authApiApp.auth',
      'authApiApp.admin',
      'authApiApp.constants',
      'authApiApp.models',
      'authApiApp.filters',
      'authApiApp.services',
      'authApiApp.directives',
      'authApiApp.dependencies'
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
      $rootScope.errors = [];

      //add function to $rootScope to add errors
      $rootScope.addError = function (error) {
        $rootScope.errors.push(error);
      };
    });

}());
