(function () {
  'use strict';
  angular.module('authApiApp')
    .config(function ($stateProvider) {
      $stateProvider
        .state('auth.providerAccounts', {
          url: '/providerAccounts/:providerId',
          templateUrl: 'app/domain/providerApps/providerAppAccounts/providerAppAccounts.html',
          controller: 'ProviderAppAccountsController',
          controllerAs: 'vm'
        });
    });

})();

