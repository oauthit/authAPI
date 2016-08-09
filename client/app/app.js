'use strict';

(function () {

  angular.module('authApiApp.dependencies', [
    'ui.router',
    'ui.router.stateHelper',
    'LocalStorageModule',
    'formly',
    'formlyBootstrap',
    'cgBusy',
    'sistemium',
    'sistemiumAngularAuth',
    'sistemiumBootstrap',
    'ngSanitize',
    'angularMoment',
    'ui.select'
  ]);

  angular.module('authApiApp', [
      'authApiApp.dependencies',
      'authApiApp.core',
      'authApiApp.admin',
      'authApiApp.constants'
    ])

    .run(function ($rootScope, sabErrorsService) {

      //add function to $rootScope to add errors
      $rootScope.addError = function (error) {
        sabErrorsService.addError(error);
      };
    });

}());
