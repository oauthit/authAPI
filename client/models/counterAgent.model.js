'use strict';

(function () {

  angular.module('authApiApp')
    .factory('CounterAgent', function (DS) {
      return DS.defineResource({
        name: 'counterAgent',
        relations: {
          hasMany: {
            contact: {
              localField: 'contacts',
              foreignKey: 'counterAgentId'
            }
          }
        }
      });
    })
    .run(function (CounterAgent) {
      console.log (CounterAgent);
    });

}());
