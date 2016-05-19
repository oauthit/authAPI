'use strict';

(function () {

  angular.module('authApiApp')
    .config(function ($httpProvider, $urlRouterProvider, localStorageServiceProvider, toastrConfig) {

      $httpProvider.interceptors.push('errorInterceptor');

      // Extend default toastr configuration with application specified configuration
      angular.extend(
        toastrConfig,
        {
          allowHtml: true,
          closeButton: true,
          extendedTimeOut: 3000
        }
      );

      $urlRouterProvider
        .otherwise('/');

      localStorageServiceProvider
        .setPrefix('authAPI');
    })
    .value('cgBusyDefaults', {
      //message:'Loading Stuff',
      //backdrop: false,
      //templateUrl: 'my_custom_template.html',
      //minDuration: 700,
      //wrapperClass: 'my-class my-class2'
      delay: 300
    })
  ;

}());
