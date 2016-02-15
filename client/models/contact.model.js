'use strict';

(function () {

  angular.module('authApiApp')
    .factory('Contact', function (DS) {
      return DS.defineResource({
        name: 'contact',
        relations: {
          belongsTo: {
            agent: {
              localField: 'agent1',
              localKey: 'agent'
            }
          }
        }
      });
    })
    .run(function (Contact) {
    });

}());
