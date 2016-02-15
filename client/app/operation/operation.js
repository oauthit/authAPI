'use strict';

angular.module('authApiApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('operations', {
        url: '/operations',
        templateUrl: 'app/operation/list/operationList.html',
        controller: 'OperationListCtrl',
        controllerAs: 'operationList'
      })
    .state('operation.add', {
      url: '/operation/add',
      templateUrl: 'app/operation/add/operationAdd.html',
      controller: 'OperationAddCtrl',
      controllerAs: 'operationAdd'
    })
  });
