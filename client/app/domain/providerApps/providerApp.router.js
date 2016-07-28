(function () {
  'use strict';
  angular.module('authApiApp')
    .config(function ($stateProvider) {
      $stateProvider
        .state('auth.providers', {
          url: '/providers',
          templateUrl: 'app/domain/providerApps/providerApps.html',
          controller: 'ProviderAppController',
          controllerAs: 'vm'
        });
    });

})();

