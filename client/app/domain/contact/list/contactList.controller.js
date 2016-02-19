'use strict';

(function () {

  angular.module('authApiApp')
    .controller('ContactListCtrl', function ($scope, Agent, CounterAgent, SettingsService, InitCtrlService) {

      var vm = this;

      CounterAgent.findAll();

      angular.extend(InitCtrlService.init(vm), {
        contacts: []
      });

      function setAgent(agent) {
        Agent.loadRelations(agent).then(function () {
          vm.contacts = agent.contacts;
        });
      }

      if (SettingsService.getCurrentAgent()) {
        setAgent(SettingsService.getCurrentAgent());
      }

      $scope.$on('current-agent', function (e, agent) {
        setAgent(agent);
      });

    })
  ;

}());
