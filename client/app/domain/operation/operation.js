'use strict';

angular.module('authApiApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('debt.operations', {
        url: '/operations',
        templateUrl: 'app/domain/operation/list/operationList.html',
        controller: 'OperationListCtrl',
        controllerAs: 'vm'
      })
      .state('debt.operation', {
        abstract: true,
        template: '<div ui-view></div>'
      })
      .state('debt.operation.add', {
        url: '/operation/add',
        templateUrl: 'app/domain/operation/add/operationAdd.html',
        controller: 'OperationAddCtrl',
        controllerAs: 'vm'
      });
  });
