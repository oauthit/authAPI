'use strict';

(function () {

  angular.module('authApiApp')
    .factory('CounterAgent', function (DS) {
      return DS.defineResource({
        name: 'counterAgent'
      });
    })
    .run(function (CounterAgent) {
    });

}());
