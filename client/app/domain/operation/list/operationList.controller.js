'use strict';

(function () {

  function OperationListController (
    $scope, Operation, CounterAgent, InitCtrlService
    //, sabErrorsService
  ){
    var vm = InitCtrlService.setup(this);

    angular.extend(vm, {

      ngTable: {
        count: 12
      },

      onSetAgent: function (agent) {
        vm.currentAgent = agent;
        vm.setupNgTable({

          getCount: function(params,o){
            return Operation.getCount(angular.extend({
              agentId: vm.currentAgent.id
            },params),o);
          },

          findAll: function(params,o){
            return Operation.findAll(angular.extend({
              agentId: vm.currentAgent.id
            },params),o);
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
