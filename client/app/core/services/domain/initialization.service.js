'use strict';

(function () {

  angular.module('authApiApp.core.services')
    .factory('InitService', function (models) {

      function init () {
        models.currency.findAll();
        models.agent.findAll();
      }

      return {
        init: init
      };

    })
  ;

}());
