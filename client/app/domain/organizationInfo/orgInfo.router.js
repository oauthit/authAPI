(function () {
  'use strict';
  angular.module('authApiApp')
    .config(function ($stateProvider) {
      $stateProvider
        .state('auth.orgInfo', {
          url: '/orgInfo/:orgId',
          templateUrl: 'app/domain/organizationInfo/orgInfo.html',
          controller: 'OrgInfoController',
          controllerAs: 'vm',
          resolve: {
            org: function (schema, $stateParams) {
              var Org = schema.model('Org');
              return Org.find($stateParams.orgId);
            }
          }
        });
    });

})();

