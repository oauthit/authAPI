'use strict';

(function () {

  angular.module('authApiApp')
    //.factory('Currency', function (DS) {
    //  return DS.defineResource({
    //    name: 'currency',
    //    relations: {
    //      hasMany: {
    //        operation: {
    //          localField: 'operations',
    //          foreignKey: 'currencyId'
    //        },
    //        agent: {
    //          localField: 'agents',
    //          foreignKey: 'currencyId'
    //        }
    //      }
    //    }
    //  });
    //})
    .run(function (Schema) {
      Schema.register({
        name: 'currency',
        relations: {
          hasMany: {
            operation: {
              localField: 'operations',
              foreignKey: 'currencyId'
            },
            agent: {
              localField: 'agents',
              foreignKey: 'currencyId'
            }
          }
        }
      });
    });

}());
