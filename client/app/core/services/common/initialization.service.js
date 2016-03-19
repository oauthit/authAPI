'use strict';

(function () {

  angular.module('authApiApp.core.services')
    .factory('InitService', function (Currency, CounterAgent, Account, Agent) {

      function init () {
        Currency.findAll();
        Agent.findAll();
        //CounterAgent.findAll();
        Account.find('me').then(function(res) {
          Account.loadRelations(res)
            .then(function (res) {console.log(res);})
            .catch(function (err) {console.log(err);});
        });
      }

      return {
        init: init
      };

    })
  ;

}());
