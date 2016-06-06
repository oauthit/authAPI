(function () {
  'use strict';
  angular.module('authApiApp')
    .config(function ($stateProvider) {
      $stateProvider
        .state('auth.account', {
          url: '/account',
          templateUrl: 'app/account/domain/account/account.html',
          controller: 'AccountController',
          controllerAs: 'vm'
        });
    });

})();

