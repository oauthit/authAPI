'use strict';

angular.module('authApiApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/?access-token',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      });
  });
