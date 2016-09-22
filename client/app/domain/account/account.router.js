'use strict';

export default function routeConfig($stateProvider) {
  'ngInject';
  $stateProvider
    .state('auth.account', {
      url: '/account',
      templateUrl: 'app/domain/account/account.html',
      controller: 'AccountController',
      controllerAs: 'vm'
    });
}
