(function () {
  'use strict';
  angular.module('authApiApp')
    .config(function (stateHelperProvider) {
      stateHelperProvider
        .state({
          name: 'auth.org.info',
          url: '/:orgId/info?isPublic',
          templateUrl: 'app/domain/organizations/organizationInfo/orgInfo.html',
          controller: 'OrgInfoController',
          controllerAs: 'vm'
        })
        .state({
          name: 'auth.org.editOrgAccount',
          url: '/:orgAccountId/edit',
          templateUrl: 'app/domain/organizations/organizationInfo/editOrgAccount.html',
          controller: 'OrgAccountController',
          controllerAs: 'vm'
        });
    })
  ;

})();
