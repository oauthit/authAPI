'use strict';

(function () {

  angular.module('authApiApp.core.services')
    .factory('InitService', function (Currency, CounterAgent, Agent) {

      function init () {
        Currency.findAll();
        Agent.findAll();
        //CounterAgent.findAll();
      }

      return {
        init: init
      };

    })
  ;

}());
