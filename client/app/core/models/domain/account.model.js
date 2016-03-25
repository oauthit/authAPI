'use strict';

(function () {

  angular.module('authApiApp')
    .factory('ProviderAccount', function (DS, appConfig) {
      return DS.defineResource({
        name: 'providerAccount',
        basePath: appConfig.apiUrl,
        relations: {
          belongsTo: {
            account: {
              localField: 'account',
              localKey: 'accountId'
            }
          }
        }
      });
    })
    .run(function (ProviderAccount) {
      console.log(ProviderAccount);
    })
    .factory('SocialAccount', function (DS) {
      return DS.defineResource({
        name: 'socialAccount',
        relations: {
          hasMany: {
            invite: [
              {
                localField: 'invitees',
                foreignKey: 'inviteeSocialAccountId'
              }, {
                localField: 'inviters',
                foreignKey: 'inviterSocialAccountId'
              }
            ]
          }
        }
      });
    })
    .factory('Account', function (DS, appConfig) {
      return DS.defineResource({
        name: 'account',
        basePath: appConfig.apiUrl,
        relations: {
          hasMany: {
            providerAccount: {
              localField: 'providers',
              foreignKey: 'accountId'
            }
          }
        }
      });
    })
    .run(function (Account, FormlyConfigService) {

      var accountFields = [
        {
          key: 'name',
          type: 'input',
          templateOptions: {
            label: 'Name',
            type: 'text',
            required: true,
            maxlength: 30
          }
        }
      ];

      FormlyConfigService.setConfig('accountInfo', accountFields);
    });

}());
