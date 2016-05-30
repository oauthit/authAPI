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
        templateUrl: 'app/domain/main/main.html',
        controller: 'MainController',
        controllerAs: 'vm'
      });
  });
