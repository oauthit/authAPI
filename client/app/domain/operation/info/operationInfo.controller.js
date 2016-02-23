'use strict';

(function () {

  angular.module('authApiApp')
    .controller('OperationInfoCtrl', function ($stateParams, InitCtrlService, Operation) {

      var vm = InitCtrlService.setup(this);
      var operationId = $stateParams.id;

      Operation.find(operationId).then(function (o) {
        vm.model = o;
        vm.fields = Operation.fields;
      });

      angular.extend(vm, {

        onSetAgent: function (agent) {
          vm.currentAgent = agent;
        }

      });

      InitCtrlService.init(vm, $scope);

    })
  ;

}());
