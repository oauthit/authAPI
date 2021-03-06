(function () {

  'use strict';

  angular.module('authApiApp')
    .config(function($stateProvider) {
      $stateProvider
        .state('auth', {
          abstract: true,
          template: '<div ui-view></div>'
        })
        .state('auth.main', {
          url: '/?access-token',
          templateUrl: 'app/domain/home/home.html',
          controller: 'HomeController',
          controllerAs: 'vm'
        });
    })
  ;

})();
