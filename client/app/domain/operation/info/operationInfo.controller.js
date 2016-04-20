'use strict';

(function () {

  angular.module('authApiApp')
    .controller('OperationInfoCtrl', function ($stateParams,
                                               $state,
                                               $scope,
                                               InitCtrlService,
                                               models,
                                               saFormlyConfigService,
                                               sabErrorsService) {

      var vm = InitCtrlService.setup(this);
      var operationId = $stateParams.id;
      var Operation = models.operation;
      var CounterAgent = models.counterAgent;
      var Currency = models.currency;

      vm.busy = Operation.find(operationId).catch(sabErrorsService.addError);

      function deleteOperation() {
        Operation.destroy(operationId).then(function () {
          //go to operation list after delete
          $state.go('^.list');
        }, sabErrorsService.addError);
      }

      function changeStatus (status) {
        return function acceptOperation() {
          vm.model.status = status;
          vm.model.DSSave().then(function () {
            //TODO message after success
          }, function (err) {
            Operation.revert (vm.model.id);
            sabErrorsService.addError (err);
          });
        };
      }

      function acceptorShowFn () {
        return vm.model && vm.currentAgent &&
          vm.model.status === 'waiting' &&
          vm.currentAgent.authId !== vm.model.authId;
      }

      angular.extend(vm, {

        fields: saFormlyConfigService.getConfigFieldsByKey('operationInfo'),

        onSetAgent: function (agent) {
          vm.currentAgent = agent;
        },

        buttons: [
          {
            name: 'Accept',
            fn: changeStatus ('accept'),
            showFn: acceptorShowFn
          },{
            name: 'Decline',
            fn: changeStatus ('reject'),
            showFn: acceptorShowFn
          },{
            name: 'Delete',
            fn: deleteOperation,
            showFn: function () {
              return vm.model && vm.currentAgent &&
                vm.model.status === 'waiting' &&
                vm.currentAgent.authId === vm.model.authId;
            }
          }
        ]

      });

      CounterAgent.findAll();

      vm.debtorField = saFormlyConfigService.getConfigKey(vm.fields, 'debtorId');
      vm.lenderField = saFormlyConfigService.getConfigKey(vm.fields, 'lenderId');
      vm.totalWithAddonField = saFormlyConfigService.getConfigKey(vm.fields, 'total');

      Currency.bindAll(false, $scope, 'vm.totalWithAddonField.templateOptions.options');
      CounterAgent.bindAll(false, $scope, 'vm.debtorField.templateOptions.options');
      CounterAgent.bindAll(false, $scope, 'vm.lenderField.templateOptions.options');
      Operation.bindOne(operationId, $scope, 'vm.model');


      InitCtrlService.init(vm, $scope);

    })
  ;

}());
