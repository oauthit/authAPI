'use strict';

(function () {

  angular.module('authApiApp.services')
    .factory('SettingsService', function ($timeout, Agent, $rootScope, localStorageService) {

      var currentAgent;

      function setCurrentAgent(agent) {
        if (!agent) {
          return;
        }
        localStorageService.set ('current-agent-id', agent.id);
        $rootScope.$broadcast('current-agent', currentAgent = agent);
      }

      function getCurrentAgent() {
        return currentAgent;
      }

      function setCurrentAgentOnChange() {
        var agents = Agent.getAll();

        if (!currentAgent || !_.findWhere(agents,{id:currentAgent.id})) {
          setCurrentAgent (Agent.get(localStorageService.get('current-agent-id')) || _.head (agents));
        }
      }

      Agent.on('DS.afterInject', function () {
        $timeout(setCurrentAgentOnChange());
      });

      Agent.on('DS.afterDestroy', function () {
        $timeout (setCurrentAgentOnChange);
      });

      return {
        setCurrentAgent: setCurrentAgent,
        getCurrentAgent: getCurrentAgent
      };



    });

}());
