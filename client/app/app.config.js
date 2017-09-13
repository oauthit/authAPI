'use strict';

(function () {

  angular.module('authApiApp')

    .config(($httpProvider, $urlRouterProvider, localStorageServiceProvider) => {

      $httpProvider.interceptors.push('errorInterceptor');

      $urlRouterProvider.otherwise('/');

      localStorageServiceProvider.setPrefix('authAPI');

    })

    .config($locationProvider => {
      $locationProvider.hashPrefix('');
    })

    .config($compileProvider => {
      $compileProvider.preAssignBindingsEnabled(true);
    })

    .value('cgBusyDefaults',{
      message: 'Loading data ...',
      templateUrl: 'components/cg-busy/busy.html'
    })
  ;

}());
