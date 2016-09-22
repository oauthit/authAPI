'use strict';

export default function routeConfig($stateProvider) {
  'ngInject';
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
}
