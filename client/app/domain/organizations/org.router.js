(function () {
  'use strict';
  angular.module('authApiApp')
    .config(function (stateHelperProvider) {
      stateHelperProvider
        .state({
          name: 'auth.org',
          url: '/org',
          templateUrl: 'app/domain/organizations/orgs.html',
          controller: 'OrgController',
          controllerAs: 'vm',
          children: [
            {
              name: 'create',
              url: '/create',
              templateUrl: 'app/domain/organizations/create/orgCreate.html',
              controller: 'OrgCreateController',
              controllerAs: 'vm'
            },
            {
              name: 'joinPublic',
              url: '/joinPublic',
              templateUrl: 'app/domain/organizations/joinPublic/joinPublic.html',
              controller: 'OrgJoinPublicController',
              controllerAs: 'vm'
            },
            {
              name: 'info',
              url: '/:orgId/info?isPublic',
              templateUrl: 'app/domain/organizationInfo/orgInfo.html',
              controller: 'OrgInfoController',
              controllerAs: 'vm'
            },
            {
              name: 'join',
              url: '/:orgId/join',
              templateUrl: 'app/domain/organizationInfo/joinOrg.html',
              controller: 'OrgInfoController',
              controllerAs: 'vm'
            },
            {
              name: 'leave',
              url: '/:orgId/leave',
              templateUrl: 'app/domain/organizationInfo/leaveOrg.html',
              controller: 'OrgInfoController',
              controllerAs: 'vm'
            }
          ]
        });
    });

})();

