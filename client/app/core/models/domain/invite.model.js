'use strict';

(function () {

  angular.module('authApiApp')

    .factory('Invite', function (DS) {
      return DS.defineResource({
        name: 'invite',
        relations: {
          belongsTo: {
            agent: {
              localField: 'ownerAgent',
              localKey: 'ownerAgentId'
            }
          },
          hasOne: {
            counterAgent: {
              localField: 'acceptorAgent',
              localKey: 'acceptorAgentId'
            },
            socialFriend: [{
              localField: 'inviter',
              localKey: 'inviterSocialAccountId'
            },{
              localField: 'invitee',
              localKey: 'inviteeSocialAccountId'
            }]
          }
        }
      });
    })

    .run(function (Invite, FormlyConfigService) {
      var fields = [
        {
          key: 'owner.name',
          type: 'input',
          templateOptions: {
            type: 'text',
            label: 'Owner',
            placeholder: 'Owner',
            disabled: true
          }
        }, {
          key: 'status',
          type: 'input',
          templateOptions: {
            type: 'text',
            label: 'Status',
            placeholder: 'Status',
            disabled: true
          }
        }, {
          key: 'code',
          id: 'inviteCode',
          type: 'input',
          templateOptions: {
            type: 'text',
            label: 'Code',
            placeholder: 'Code',
            disabled: true
          }
        }
      ];

      FormlyConfigService.setConfig('invite', fields);
    })
  ;

}());
