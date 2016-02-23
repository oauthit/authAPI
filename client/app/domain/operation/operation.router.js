'use strict';

angular.module('authApiApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('debt.operation', {
        abstract: true,
        template: '<div ui-view class="container"></div>'
      })
      .state('debt.operation.list', {
        url: '/operations',
        templateUrl: 'app/domain/operation/list/operationList.html',
        controller: 'OperationListCtrl',
        controllerAs: 'vm'
      })
      .state('debt.operation.add', {
        url: '/operation/add',
        templateUrl: 'app/domain/operation/add/operationAdd.html',
        controller: 'OperationAddCtrl',
        controllerAs: 'vm'
      })
      .state('debt.operation.info', {
        url: '/operation/info/:id',
        templateUrl: 'app/domain/operation/info/operationInfo.html',
        controller: 'OperationInfoCtrl',
        controllerAs: 'vm'
      })
  });
