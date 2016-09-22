'use strict';

export default function (stateHelperProvider) {
  'ngInject';
  stateHelperProvider
    .state({
      name: 'auth.providers',
      url: '/providers',
      templateUrl: 'app/domain/providerApps/providerApps.html',
      controller: 'ProviderAppController',
      controllerAs: 'vm',
      children: [
        {
          name: 'add',
          url: '/addProvider',
          templateUrl: 'app/domain/providerApps/addProvider.html',
          controller: 'AddProviderAppController',
          controllerAs: 'vm'
        }
      ]
    });
}

