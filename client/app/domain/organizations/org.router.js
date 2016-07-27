(function () {
  'use strict';
  angular.module('authApiApp')
    .config(function ($stateProvider) {
      $stateProvider
        .state('auth.org', {
          url: '/org',
          templateUrl: 'app/domain/organizations/org.html',
          controller: 'OrgController',
          controllerAs: 'vm'
        });
    });

})();

