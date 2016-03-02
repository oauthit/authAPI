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
          acceptorId: vm.agent.id
          acceptorId: vm.currentAgent.id
        };
        Operation.save(data).then(function () {
          //TODO message after success
        }, function (err) {
          ErrorsService.addError(err);
        });
      }

      angular.extend(vm, {

        fields: FormlyConfigService.getConfigFieldsByKey('operationInfo'),

        onSetAgent: function (agent) {
          vm.currentAgent = agent;
          vm.buttons = [];

          operationPromise.then(function (o) {
            vm.model = o;
            if (o.status === 'waiting' && vm.currentAgent.id !== o.creatorId &&
              _.contains([o.debtorId, o.lenderId], vm.currentAgent.id)) {
              vm.buttons.push({
                name: 'Accept',
                fn: acceptOperation
              });
            } else if (o.status === 'accepted' && vm.currentAgent.id === o.creatorId) {
              vm.buttons.push({
                name: 'Delete',
                fn: deleteOperation
              });
            } else if (o.status === 'waiting' && vm.currentAgent.id === o.creatorId) {
              vm.buttons.push({
                name: 'Decline',
                fn: deleteOperation
              });
            }
          });

        },

        buttons: []

      });

      CounterAgent.findAll();

      vm.debtorField = FormlyConfigService.getConfigKey(vm.fields, 'debtorId');
      vm.lenderField = FormlyConfigService.getConfigKey(vm.fields, 'lenderId');
      vm.totalWithAddonField = FormlyConfigService.getConfigKey(vm.fields, 'total');

      Currency.bindAll(false, $scope, 'vm.totalWithAddonField.templateOptions.options');
      CounterAgent.bindAll(false, $scope, 'vm.debtorField.templateOptions.options');
      CounterAgent.bindAll(false, $scope, 'vm.lenderField.templateOptions.options');


      InitCtrlService.init(vm, $scope);

    })
  ;

}());
