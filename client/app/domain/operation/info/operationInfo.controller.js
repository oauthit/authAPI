'use strict';

(function () {

  angular.module('authApiApp')
    .controller('OperationInfoCtrl', function ($stateParams,
                                               $state,
                                               $scope,
                                               InitCtrlService,
                                               Operation,
                                               CounterAgent,
                                               Currency,
                                               ErrorsService) {

      var vm = InitCtrlService.setup(this);
      var operationId = $stateParams.id;

      var operationPromise = Operation.find(operationId);

      function deleteOperation() {
        Operation.destroy(operationId).then(function () {
          //go to operation list after delete
          $state.go('^.list');
        }, function (err) {
          ErrorsService.addError(err);
        });
      }

      function acceptOperation() {
        var data = {
          id: operationId,
          confirmed: true,
          acceptorId: vm.agent.id
        };
        Operation.save(data).then(function () {
          //TODO message after success
        }, function (err) {
          ErrorsService.addError(err);
        });
      }

      angular.extend(vm, {

        fields: Operation.fieldsInfo,

        onSetAgent: function (agent) {
          vm.currentAgent = agent;
        },

        //TODO initialize buttons by state
        buttons: (function () {

          var buttons = [];

          operationPromise.then(function (o) {
            vm.model = o;
            if (o.status === 'waiting') {
              buttons.push({
                name: 'Accept',
                fn: acceptOperation
              });
            } else if (o.status === 'accepted') {
              buttons.push({
                name: 'Delete',
                fn: deleteOperation
              });
            }
          });

          return buttons;

        }())

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
