'use strict';

export default function ($stateProvider) {
  $stateProvider
    .state('auth.providerAccounts', {
      url: '/providerAccounts/:providerId',
      templateUrl: 'app/domain/providerApps/providerAppAccounts/providerAppAccounts.html',
      controller: 'ProviderAppAccountsController',
      controllerAs: 'vm'
    });
}
