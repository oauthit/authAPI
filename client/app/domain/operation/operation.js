'use strict';

angular.module('authApiApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('operations', {
        url: '/operations',
        templateUrl: 'app/domain/operation/list/operationList.html',
        controller: 'OperationListCtrl',
        controllerAs: 'operationList'
      })
      .state('operation.add', {
        url: '/operation/add',
        templateUrl: 'app/domain/operation/add/operationAdd.html',
        controller: 'OperationAddCtrl',
        controllerAs: 'operationAdd'
      })
  });
