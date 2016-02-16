'use strict';

angular.module('authApiApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('debt.agent', {
        url: '/agent',
        template: '<div ui-view></div>',
        abstract: true
      })
      .state('debt.agent.manage', {
        url: '/agent/manage',
        templateUrl: 'app/domain/agent/agent.html',
        controller: 'AgentCtrl',
        controllerAs: 'vm'
      });
  })
;
