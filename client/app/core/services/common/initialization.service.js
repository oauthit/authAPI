'use strict';

(function () {

  angular.module('authApiApp.core.services')
    .factory('InitService', function (Currency, Agent) {

      function init () {
        Currency.findAll();
        Agent.findAll();
      }

      return {
        init: init
      };

    })
  ;

}());
