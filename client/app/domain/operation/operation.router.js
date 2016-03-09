'use strict';

angular.module('authApiApp')
  .config(function (stateHelperProvider) {
    stateHelperProvider
      .state({
        name: 'debt.operation',
        abstract: true,
        template: '<div ui-view class="container"></div>',
        children: [
          {
            name: 'list',
            url: '/operations',
            templateUrl: 'app/domain/operation/list/operationList.html',
            controller: 'OperationListCtrl',
            controllerAs: 'vm'
          },
          {
            name: 'add',
            url: '/operation/add',
            templateUrl: 'app/domain/operation/add/operationAdd.html',
            controller: 'OperationAddCtrl',
            controllerAs: 'vm'
          },
          {
            name: 'info',
            url: '/operation/info/:id',
            templateUrl: 'app/domain/operation/info/operationInfo.html',
            controller: 'OperationInfoCtrl',
            controllerAs: 'vm'
          }
        ]
      });
  });
