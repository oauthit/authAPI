'use strict';

(function () {

  function OperationAddController($scope, Operation, Contact, Agent, CounterAgent, DS) {

    var vm = this;
    Contact.findAll().then(function (contacts) {
      contacts.forEach(function (contact) {
        Contact.loadRelations(contact).then(function (c) {
          vm.contacts.push(c);
        });
      });
    });

    console.log (DS);

    angular.extend(vm, {
      contacts: [],
      fields: Operation.fields,
      operation: {},
      selectContact: function (item) {
        vm.operation.contactId = item.counterAgentId;
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

    Agent.bindAll(false, $scope, 'vm.ownerField.templateOptions.options');
    CounterAgent.bindAll(false, $scope, 'vm.contactField.templateOptions.options');

  }

  angular.module('authApiApp')
    .controller('OperationAddCtrl', OperationAddController);

}());
