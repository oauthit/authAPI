'use strict';

(function () {

  function OperationAddController(
    $scope,
    $q,
    Agent,
    Operation,
    CounterAgent,
    Currency,
    InitCtrlService,
    FormlyConfigService,
    ErrorsService
  ) {

    var vm = InitCtrlService.setup (this);

    angular.extend(vm, {

      contacts: [],
      fields: FormlyConfigService.getConfigFieldsByKey('operationCreate'),
      operation: {},
      options: {},

      data: {
        role: 'debt'
      },

      onCancel: function (form) {
        if (vm.operation.id) {
          Operation.revert(vm.operation.id);
        }
        vm.data = angular.copy (vm.dataPristine);
        if (!vm.data.currencyId) {
          vm.data.currencyId = vm.agent.currencyId;
        }
        form.$setPristine();
      },

      onSubmit: function (form) {


        if (vm.data.role === 'debt') {
          vm.data.debtorId = vm.agent.id;
          vm.data.lenderId = vm.data.contact.counterAgentId;
        } else {
          vm.data.debtorId = vm.data.contact.counterAgentId;
          vm.data.lenderId = vm.agent.id;
        }

        //vm.data.lenderId = null;

        //TODO set default value in STAPI

        angular.extend (vm.operation,{
          total: vm.data.total,
          currencyId: vm.data.currencyId,
          debtorId: vm.data.debtorId,
          lenderId: vm.data.lenderId,
          isConfirmed: false,
          creatorId: vm.agent.id
        });

        ErrorsService.clear();

        Operation.create(vm.operation).then(function (res) {
          vm.operation = res;
          form.$setPristine();
          console.log(res);
          vm.dataPristine = angular.copy (vm.data);
        }, function (err) {
          ErrorsService.addError(err);
        });
      },

      isSaved: function () {
        return !ErrorsService.errors.length && vm.operation.id;
      },

      onSetAgent: function(agent) {
        vm.busy = Agent.loadRelations(agent).then(function () {
          vm.agent = agent;
          vm.data.currencyId = agent.currencyId;
        });
      }

    });

    vm.originalFields = angular.copy(vm.fields);
    vm.dataPristine = angular.copy (vm.data);
    vm.counterAgentField = FormlyConfigService.getConfigKey(vm.fields, 'contact');
    vm.counterAgentField.templateOptions.liveSearch = function (viewValue) {
      return _.filter(vm.agent.contacts, function (c) {
        return _.includes(c.counterAgent.name.toLowerCase(), viewValue.toLowerCase());
      });
    };
    vm.currencyField = FormlyConfigService.getConfigKey(vm.fields, 'currencyId');

    Currency.bindAll(false, $scope, 'vm.currencyField.templateOptions.options');

    vm.busy = $q.all ([
      CounterAgent.findAll(),
      Currency.findAll()
    ]);

    InitCtrlService.init (vm, $scope);

  }

  angular.module('authApiApp')
    .controller('OperationAddCtrl', OperationAddController);

}());
