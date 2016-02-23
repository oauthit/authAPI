'use strict';

(function () {

  angular.module('authApiApp')
    .controller('OperationInfoCtrl', function (
      $stateParams, $scope, InitCtrlService,
      Operation,
      CounterAgent,
      Currency
    ) {

      var vm = InitCtrlService.setup (this);
      var operationId = $stateParams.id;

      Operation.find(operationId).then(function (o) {
        vm.model = o;
      });

      angular.extend(vm, {

        fields: Operation.fieldsInfo,

        onSetAgent: function (agent) {
          vm.currentAgent = agent;
        }

      });

      CounterAgent.findAll();

      // TODO: make FormlyConfig service for retrieving fields configs and find by key
      vm.debtorField = vm.fields[0];
      vm.lenderField = vm.fields[1];
      vm.currencyField = vm.fields[3];

      Currency.bindAll(false, $scope, 'vm.currencyField.templateOptions.options');
      CounterAgent.bindAll(false, $scope, 'vm.debtorField.templateOptions.options');
      CounterAgent.bindAll(false, $scope, 'vm.lenderField.templateOptions.options');


      InitCtrlService.init(vm, $scope);

    })
  ;

}());
