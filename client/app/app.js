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

    .run(function ($rootScope, sabErrorsService, schema) {

      //add function to $rootScope to add errors
      $rootScope.addError = function (error) {
        sabErrorsService.addError(error);
      };

      $rootScope.$on('logged-in', function (e) {
        console.log('event:', e);
        var Org = schema.model('Org');
        Org.findAll();
      });
    });

}());
