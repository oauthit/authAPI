'use strict';

(function () {

  angular.module('authApiApp.services')
    .factory('SettingsService', function ($timeout, Agent, $rootScope) {

      var currentAgent = null;

      function setCurrentAgent(agent) {
        $rootScope.$broadcast('current-agent', currentAgent = agent);
      }

      function getCurrentAgent() {
        return currentAgent;
      }

      function setCurrentAgentOnChange() {
        var agents = Agent.getAll();

        if (!currentAgent || !_.findWhere(agents,{id:currentAgent.id})) {
          setCurrentAgent (_.head (agents));
        }
      }

      Agent.on('DS.afterInject', function () {
        setCurrentAgentOnChange();
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
