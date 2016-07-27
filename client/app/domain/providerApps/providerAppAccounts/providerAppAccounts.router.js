(function () {
  'use strict';
  angular.module('authApiApp')
    .config(function ($stateProvider) {
      $stateProvider
        .state('auth.providerAccounts', {
          url: '/providerAccounts/:providerId',
          templateUrl: 'app/account/domain/providerApps/providerAppAccounts/providerAppAccounts.html',
          controller: 'ProviderAppAccountsController',
          controllerAs: 'vm',
          resolve: {
            providerAccounts: function ($stateParams, schema) {
              let ProviderAccount = schema.model('ProviderAccount');

              return ProviderAccount.findAll({providerAppId: $stateParams.providerId}, {bypassCache: true});
            },
            providerApp: function($stateParams, schema) {
              let ProviderApp = schema.model('ProviderApp');

              return ProviderApp.find($stateParams.providerId);
            }
          }
        });
    });

})();

