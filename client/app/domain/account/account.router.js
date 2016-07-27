(function () {
  'use strict';
  angular.module('authApiApp')
    .config(function ($stateProvider) {
      $stateProvider
        .state('auth.account', {
          url: '/account',
          templateUrl: 'app/domain/account/account.html',
          controller: 'AccountController',
          controllerAs: 'vm'
        });
    });

})();

