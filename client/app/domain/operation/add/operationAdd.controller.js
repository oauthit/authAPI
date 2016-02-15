'use strict';

(function () {

  function OperationAddController ($scope, Operation, Contact){

    var vm = this;

    Contact.findAll().then(function (contacts) {
      contacts.forEach (function (contact) {
        Contact.loadRelations(contact,['agent1']);
      });
    });

    Contact.bindAll(false, $scope, 'vm.contacts');

    angular.extend(vm,{
      fields: Operation.fields,
      operation: Operation.createInstance(),
      selectContact: function (item) {
        console.log (item.id);
      }
    });

  }

  angular.module('authApiApp')
    .controller('OperationAddCtrl', OperationAddController);

}());
