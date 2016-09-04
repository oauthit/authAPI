(function () {
  'use strict';
  angular.module('authApiApp')
    .config(function (stateHelperProvider) {
      stateHelperProvider
        .state({
          name: 'auth.org',
          url: '/org',
          templateUrl: 'app/domain/organizations/orgs.html',
          controller: 'OrgsController',
          controllerAs: 'vm',
          data: { authenticate: true },
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
              name: 'setOrgRoles',
              url: '/:orgId/setOrgRoles',
              templateUrl: 'app/domain/organizations/organizationInfo/OrgRoles.html',
              controller: 'OrgRolesController',
              controllerAs: 'vm'
            },
            {
              name: 'join',
              url: '/:orgId/join',
              templateUrl: 'app/domain/organizations/organizationInfo/joinOrg.html',
              controller: 'OrgInfoController',
              controllerAs: 'vm'
            },
            {
              name: 'leave',
              url: '/:orgId/leave',
              templateUrl: 'app/domain/organizations/organizationInfo/leaveOrg.html',
              controller: 'OrgInfoController',
              controllerAs: 'vm'
            }
          ]
        });
    });

})();

