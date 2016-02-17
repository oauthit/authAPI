'use strict';

(function () {

  angular.module('authApiApp.services')
    .factory('InitService', function (Currency, Agent) {

      function init () {
        Currency.findAll().then(function (currencies) {
          currencies.forEach(function (currency) {
            Currency.loadRelations(currency);
          });
        });
        Agent.findAll().then(function (agents) {
          agents.forEach(function (agent) {
            Agent.loadRelations(agent);
          })
        });
      }

      return {
        init: init
      };

    })
  ;

}());
