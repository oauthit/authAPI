'use strict';

(function () {

  angular.module('authApiApp')
    .config(function ($httpProvider, $urlRouterProvider, localStorageServiceProvider) {

      $httpProvider.interceptors.push('errorInterceptor');

      $urlRouterProvider
        .otherwise('/');

      localStorageServiceProvider
        .setPrefix('authAPI');
    })
    .value('cgBusyDefaults',{
      message: 'Loading data ...',
      templateUrl: 'components/cg-busy/busy.html'
    })
  ;

}());
