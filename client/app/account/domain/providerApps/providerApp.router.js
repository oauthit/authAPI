(function () {
  'use strict';
  angular.module('authApiApp')
    .config(function ($stateProvider) {
      $stateProvider
        .state('auth.providers', {
          url: '/providers',
          templateUrl: 'app/account/domain/providerApps/providerApps.html'
          //controller: 'MainController',
          //controllerAs: 'vm'
        });
    });

})();

