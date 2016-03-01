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
              localKey: 'ownerId',
              parent: true
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
      Contact.fields = [
        {
          key: 'counterAgent.name',
          type: 'input',
          templateOptions: {
            type: 'text',
            disabled: true,
            label: 'Contact name'
          }
        }
      ];
    });

}());
