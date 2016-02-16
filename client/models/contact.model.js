'use strict';

(function () {

  angular.module('authApiApp')
    .factory('Contact', function (DS) {
      return DS.defineResource({
        name: 'contact',
        relations: {
          belongsTo: {
            agent: {
              localField: 'agent',
              localKey: 'agentId'
            }
          }
        }
      });
    })
    .run(function (Contact) {
      console.log (Contact);
    });

}());
