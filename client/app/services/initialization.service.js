'use strict';

(function () {

  angular.module('authApiApp.services')
    .factory('InitService', function (Currency, Agent, $rootScope) {

      function init () {
        Currency.findAll();
        Agent.findAll();
      }

      console.log ('InitService');

      $rootScope.$on('logged-in',function(){
        console.log ('init');
        init();
      });

      return {
        init: init
      };

    })
  ;

}());
