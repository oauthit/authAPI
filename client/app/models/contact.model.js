'use strict';

(function () {

  angular.module('authApiApp')
    .factory('Contact', function (DS) {
      return DS.defineResource({
        name: 'contact',
        relations: {
          belongsTo: {
            agent: {
              localField: 'owner',
              localKey: 'ownerId'
            },
            counterAgent: {
              localField: 'counterAgent',
              localKey: 'counterAgentId'
            }
          }
        }
      });
    })
    .run(function (Contact) {
      console.log(Contact);
    });

}());
