'use strict';

(function () {

  function OperationAddController (Operation, CounterAgent){

    var vm = this;

    angular.extend(vm,{
      contacts: CounterAgent.findAll(),
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
