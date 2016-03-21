'use strict';

(function () {

  angular.module('authApiApp')
    .factory('Currency', function (DS) {
      return DS.defineResource({
        name: 'currency',
        relations: {
          hasMany: {
            operation: {
              localField: 'operations',
              foreignKey: 'currency'
            },
            agent: {
              localField: 'agents',
              foreignKey: 'currency'
            }
          }
        }
      });
    })
    .run(function (Currency) {
      console.log (Currency);
    });

}());
