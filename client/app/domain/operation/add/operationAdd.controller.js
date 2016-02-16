'use strict';

(function () {

  function OperationAddController($scope, Operation, Contact, Agent, CounterAgent, Currency, DS) {

    var vm = this;
    Contact.findAll().then(function (contacts) {
      contacts.forEach(function (contact) {
        Contact.loadRelations(contact).then(function (c) {
          vm.contacts.push(c);
        });
      });
    });

    Currency.findAll().then(function (currencies) {
      vm.currencies = currencies;
    });

    console.log (DS);

    angular.extend(vm, {
      contacts: [],
      fields: Operation.fields,
      operation: {},
      selectContact: function (item) {
        vm.operation.debtorId = item.counterAgentId;
      },
      onSubmit: function () {
        Operation.create(vm.operation).then(function (res) {
          console.log(res);
        }, function (err) {
          console.log(err);
        });
      }
    });

    vm.ownerField = vm.fields[0];
    vm.contactField = vm.fields[1];
    vm.currencyField = vm.fields[3];

    Agent.bindAll(false, $scope, 'vm.ownerField.templateOptions.options');
    CounterAgent.bindAll(false, $scope, 'vm.contactField.templateOptions.options');
    Currency.bindAll(false, $scope, 'vm.currencyField.templateOptions.options');

  }

  angular.module('authApiApp')
    .controller('OperationAddCtrl', OperationAddController);

}());
