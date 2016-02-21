'use strict';

(function () {

  function OperationAddController($scope, Operation, Agent, CounterAgent, Currency, SettingsService, ErrorsService) {

    var vm = this;

    angular.extend(vm, {

      contacts: [],
      fields: Operation.fields,
      operation: {},

      data: {
        role: 'debt'
      },

      onCancel: function (form) {
        if (vm.operation.id) {
          Operation.revert(vm.operation.id);
        }
        vm.data = angular.copy (vm.dataPristine);
        if (!vm.data.currencyId) {
          vm.data.currencyId = vm.agent.currencyId;
        }
        form.$setPristine();
      },

      onSubmit: function (form) {

        if (vm.data.role === 'debt') {
          vm.data.debtorId = vm.agent.id;
          vm.data.lenderId = vm.data.contact.counterAgentId;
        } else {
          vm.data.debtorId = vm.data.contact.counterAgentId;
          vm.data.lenderId = vm.agent.id;
        }

        //vm.data.lenderId = null;

        angular.extend (vm.operation,{
          total: vm.data.total,
          currencyId: vm.data.currencyId,
          debtorId: vm.data.debtorId,
          lenderId: vm.data.lenderId
        });

        Operation.create(vm.operation).then(function (res) {
          vm.operation = res;
          form.$setPristine();
          console.log(res);
          vm.dataPristine = angular.copy (vm.data);
        }, function (err) {
          ErrorsService.addError(err);
        });
      },

      isSaved: function () {
        return !ErrorsService.errors.length && vm.operation.id;
      }

    });

    vm.dataPristine = angular.copy (vm.data);

    function setAgent(e,agent) {
      if (!agent) {
        return;
      }
      Agent.loadRelations(agent).then(function () {
        vm.agent = agent;
        vm.counterAgentField.templateOptions.options = agent.contacts;
        vm.data.currencyId = agent.currencyId;
      });
    }

    $scope.$on('current-agent', setAgent);

    CounterAgent.findAll().then(function (data) {
      vm.counterAgents = data;
    });

    Currency.findAll().then(function (data) {
      vm.currencies = data;
    });

    vm.counterAgentField = vm.fields[0];
    vm.currencyField = vm.fields[2];

    Currency.bindAll(false, $scope, 'vm.currencyField.templateOptions.options');

    setAgent(false,SettingsService.getCurrentAgent());

  }

  angular.module('authApiApp')
    .controller('OperationAddCtrl', OperationAddController);

}());
