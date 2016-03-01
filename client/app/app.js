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
    'angularMoment',
    'cgBusy',
    'ngTable'
  ]);

  angular.module('authApiApp', [
      'authApiApp.dependencies',
      'authApiApp.core',
      'authApiApp.auth',
      'authApiApp.admin',
      'authApiApp.constants'
    ])

    .config(function($urlRouterProvider) {
      $urlRouterProvider
        .otherwise('/');
    })

    .config(function(localStorageServiceProvider) {
      localStorageServiceProvider
        .setPrefix('authAPI');
    })

    .value('cgBusyDefaults',{
      //message:'Loading Stuff',
      //backdrop: false,
      //templateUrl: 'my_custom_template.html',
      //minDuration: 700,
      //wrapperClass: 'my-class my-class2'
      delay: 300
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
