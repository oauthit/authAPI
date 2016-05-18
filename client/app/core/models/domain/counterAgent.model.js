'use strict';

(function () {

  angular.module('authApiApp')
    //.factory('CounterAgent', function (DS) {
    //  return DS.defineResource({
    //    name: 'counterAgent',
    //    relations: {
    //      hasMany: {
    //        contact: {
    //          localField: 'contacts',
    //          foreignKey: 'counterAgentId'
    //        }
    //      }
    //    }
    //  });
    //})
    .run(function (Schema) {
      Schema.register({
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
    });

}());
