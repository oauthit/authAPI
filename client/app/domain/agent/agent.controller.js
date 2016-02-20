'use strict';

angular.module('authApiApp')
  .controller('AgentCtrl', function ($scope, Agent, Currency, $uiViewScroll, $timeout) {
    var vm = this;

    Currency.findAll();

    Agent.findAll().then(function (agents) {
      agents.forEach(function (agent) {
        Agent.loadRelations(agent);
        vm.agents.push(agent);
      });
    });

    angular.extend(vm, {

      fields: Agent.fields,
      agents: [],

      onCancel: function (agent, form) {
        if (agent.id) {
          Agent.revert(agent.id);
          vm[form].$setPristine();
        } else {
          vm.agents.splice(vm.agents.indexOf(agent), 1);
        }
      },

      onSubmit: function (agent, form) {
        delete agent.focus;
        Agent.create(agent).then(function (res) {
          console.log(res);
          vm[form].$setPristine();
        }, function (err) {
          console.log(err);
        });
      },

      onAdd: function () {
        var agent = Agent.createInstance();
        vm.agents.push(agent);

        $timeout(function() {
          agent.focus = true;
          $timeout(function(){
            var elem = angular.element('#new-agent');
            $uiViewScroll(elem);
          },100);
        },200);
      },

      disableAddAgent: function () {
        return vm.agents.some(function (agent) {
          return !agent.id;
        });
      },

      onRemove: function (agent,form) {
        if (agent.id) {
          Agent.destroy(agent.id).then(function () {
            vm.agents.splice(vm.agents.indexOf(agent), 1);
          });
        } else {
          vm.onCancel (agent,form);
        }
      }

    });

    vm.nameField = vm.fields[0];

    vm.nameField.expressionProperties = {
      'templateOptions.focus': 'model.focus'
    };

    vm.currencyField = vm.fields[1];

    //Agent.bindAll(false, $scope, 'vm.agents');
    Currency.bindAll(false, $scope, 'vm.currencyField.templateOptions.options');
  });
