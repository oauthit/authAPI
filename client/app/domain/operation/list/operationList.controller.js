'use strict';

(function () {

  function OperationListController (
    $scope, Operation, Agent, CounterAgent, Currency, SettingsService
    //, ErrorsService
  ){
    var vm = this;

    function setAgent(oa, na) {

      var agent = na || oa;

      if (!agent) {
        return;
      }

      var f = {owner: agent.id};

      vm.currentAgent = agent;

      Operation.bindAll({}, $scope, 'vm.operations');
      Operation.findAll(f,{bypassCache:true}).then(function (os) {
        CounterAgent.findAll();
      });

    }

    $scope.$on('current-agent', setAgent);

    setAgent (SettingsService.getCurrentAgent());

    angular.extend(vm, {

    });

  }

  angular.module('authApiApp')
    .controller('OperationListCtrl', OperationListController);


}());
