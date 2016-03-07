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
                                               FormlyConfigService,
                                               ErrorsService) {

      var vm = InitCtrlService.setup(this);
      var operationId = $stateParams.id;

      vm.busy = Operation.find(operationId).catch(ErrorsService.addError);

      function deleteOperation() {
        Operation.destroy(operationId).then(function () {
          //go to operation list after delete
          $state.go('^.list');
        }, ErrorsService.addError);
      }

      function changeStatus (status) {
        return function acceptOperation() {
          vm.model.status = status;
          vm.model.DSSave().then(function () {
            //TODO message after success
          }, function (err) {
            Operation.revert (vm.model.id);
            ErrorsService.addError (err);
          });
        };
      }

      function acceptorShowFn () {
        return vm.model && vm.currentAgent &&
          vm.model.status === 'waiting' &&
          vm.currentAgent.authId !== vm.model.authId;
      }

      angular.extend(vm, {

        fields: FormlyConfigService.getConfigFieldsByKey('operationInfo'),

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

      vm.debtorField = FormlyConfigService.getConfigKey(vm.fields, 'debtorId');
      vm.lenderField = FormlyConfigService.getConfigKey(vm.fields, 'lenderId');
      vm.totalWithAddonField = FormlyConfigService.getConfigKey(vm.fields, 'total');

      Currency.bindAll(false, $scope, 'vm.totalWithAddonField.templateOptions.options');
      CounterAgent.bindAll(false, $scope, 'vm.debtorField.templateOptions.options');
      CounterAgent.bindAll(false, $scope, 'vm.lenderField.templateOptions.options');
      Operation.bindOne(operationId, $scope, 'vm.model');


      InitCtrlService.init(vm, $scope);

    })
  ;

}());
