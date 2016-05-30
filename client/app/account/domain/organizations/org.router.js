(function () {
  'use strict';
  angular.module('authApiApp')
    .config(function ($stateProvider) {
      $stateProvider
        .state('auth.org', {
          url: '/org',
          templateUrl: 'app/account/domain/organizations/org.html'
          //controller: 'MainController',
          //controllerAs: 'vm'
        });
    });

})();

