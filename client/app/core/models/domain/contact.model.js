'use strict';

(function () {

  angular.module('authApiApp')
    .factory('Contact', function (DS) {
      return DS.defineResource({
        name: 'contact',
        relations: {
          belongsTo: {
            agent: {
              localField: 'ownerEntity',
              localKey: 'ownerAgent',
              parent: true
            },
            counterAgent: {
              localField: 'counterAgentEntity',
              localKey: 'counterAgent'
            }
          }
        }
      });
    })
    .run(function (Contact, FormlyConfigService) {
      var fields = [
        {
          key: 'counterAgentEntity.name',
          type: 'input',
          templateOptions: {
            type: 'text',
            disabled: true,
            label: 'Contact name'
          }
        }
      ];

      var contactAdd = [{
        key: 'inviteCode',
        type: 'input',
        templateOptions: {
          placeholder: 'Enter invite code',
          type: 'text',
          label: 'Invite code',
          required: true
        }
      }, {
        key: 'mobileNumber',
        type: 'input',
        templateOptions: {
          placeholder: 'Search by mobile number',
          type: 'text',
          disabled: true,
          label: 'Sms'
        }
      }, {
        key: 'email',
        type: 'input',
        templateOptions: {
          placeholder: 'Search by email',
          type: 'text',
          disabled: true,
          label: 'Email'
        }
      }];

      FormlyConfigService.setConfig('contact', fields);
      FormlyConfigService.setConfig('contactAdd', contactAdd);
    });

}());
