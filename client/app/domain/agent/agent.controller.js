'use strict';

angular.module('authApiApp')
  .controller('AgentCtrl', function ($scope, Agent) {
    var vm = this;

    Agent.findAll();

    angular.extend(vm, {
      agents: [],
      fields: Agent.fields
    });
    Agent.bindAll(false, $scope, 'vm.agents');
  });
