'use strict';

(function () {

  function OperationListController($scope,
                                   models,
                                   InitCtrlService) {

    var vm = InitCtrlService.setup(this);
    var Operation = models.operation;
    var CounterAgent = models.counterAgent;

    angular.extend(vm, {

      ngTable: {
        count: 12
      },

      onSetAgent: function (agent) {
        vm.currentAgent = agent;
        vm.setupNgTable({

          getCount: function (params, o) {
            let p = angular.extend({agentId: vm.currentAgent.id}, params);
            return Operation.getCount([p, o]);
          },

          findAll: function (params, o) {
            return Operation.findAll(angular.extend({
              agentId: vm.currentAgent.id
            }, params), o);
          }

        });
      }

    });

    CounterAgent.findAll();

    InitCtrlService.init(vm, $scope);

  }

  angular.module('authApiApp')
    .controller('OperationListCtrl', OperationListController);


}());
