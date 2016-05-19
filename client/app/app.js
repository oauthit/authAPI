'use strict';

(function () {

  angular.module('authApiApp.dependencies', [
    'ngSanitize',
    'ui.router',
    'ui.router.stateHelper',
    'validation.match',
    'LocalStorageModule',
    'formly',
    'formlyBootstrap',
    'ngclipboard',
    'angularMoment',
    'cgBusy',
    'sistemium',
    'sistemiumBootstrap'
  ]);

  angular.module('authApiApp', [
      'authApiApp.dependencies',
      'authApiApp.core',
      'authApiApp.admin',
      'authApiApp.constants'
    ])

    .run(function ($rootScope, InitService, sabErrorsService) {
      //subscribe for logged-in event
      $rootScope.$on('logged-in',function(){
        InitService.init();
      });

      //add function to $rootScope to add errors
      $rootScope.addError = function (error) {
        sabErrorsService.addError(error);
      };
    });

}());
