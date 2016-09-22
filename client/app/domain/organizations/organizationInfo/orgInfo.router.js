'use strict';

export default function routeConfig(stateHelperProvider) {
  'ngInject';
  stateHelperProvider
    .state({
      name: 'auth.org.info',
      url: '/:orgId/info?isPublic',
      templateUrl: 'app/domain/organizations/organizationInfo/orgInfo.html',
      controller: 'OrgInfoController',
      controllerAs: 'vm'
    })
    .state({
      name: 'auth.org.orgAccount',
      url: '/:orgAccountId/edit',
      templateUrl: 'app/domain/organizations/organizationInfo/orgAccount.html',
      controller: 'OrgAccountController',
      controllerAs: 'vm'
    });
}
