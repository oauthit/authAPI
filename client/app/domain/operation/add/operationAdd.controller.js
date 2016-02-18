'use strict';

(function () {

  function OperationAddController($scope, Operation, Agent, CounterAgent, Currency, SettingsService) {

    var vm = this;

    CounterAgent.findAll();

    angular.extend(vm, {

      contacts: [],
      fields: Operation.fields,
      operation: {},

      data: {
        role: 'debt'
      },

      submitDisabled: function () {
        return !vm.data.selectedContact;
      },

      selectContact: function (item) {
        vm.data.selectedContact = item;
      },

      onSubmit: function () {

        if (vm.data.role === 'debt') {
          vm.data.debtorId = vm.data.selectedContact.ownerId;
          vm.data.lenderId = vm.data.selectedContact.counterAgentId;
        } else {
          vm.data.debtorId = vm.data.selectedContact.counterAgentId;
          vm.data.lenderId = vm.data.selectedContact.ownerId;
        }

        vm.operation = {
          total: vm.data.total,
          currencyId: vm.data.currencyId,
          debtorId: vm.data.debtorId,
          lenderId: vm.data.lenderId
        };

        Operation.create(vm.operation).then(function (res) {
          console.log(res);
        }, function (err) {
          console.log(err);
        });
      }

    });

    function setAgent(agent) {
      Agent.loadRelations(agent).then(function () {
        vm.agent = agent;
        vm.data.contacts = agent.contacts;
        vm.data.currencyId = agent.currencyId;
      });
    }

    if (SettingsService.getCurrentAgent()) {
      setAgent(SettingsService.getCurrentAgent());
    }

    $scope.$on('current-agent', function (e, agent) {
      setAgent(agent);
      vm.data.selectedContact = undefined;
    });

    Currency.findAll().then(function (currencies) {
      vm.currencies = currencies;
    });

    vm.currencyField = vm.fields[1];

    Currency.bindAll(false, $scope, 'vm.currencyField.templateOptions.options');

  }

  angular.module('authApiApp')
    .controller('OperationAddCtrl', OperationAddController);

}());
