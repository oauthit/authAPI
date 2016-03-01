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
    'ngTable',
    'toastr'
  ]);

  angular.module('authApiApp', [
      'authApiApp.dependencies',
      'authApiApp.core',
      'authApiApp.auth',
      'authApiApp.admin',
      'authApiApp.constants'
    ])

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
