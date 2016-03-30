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
    .factory('SocialAccount', function (DS, appConfig) {
      return DS.defineResource({
        name: 'socialAccount',
        basePath: appConfig.apiUrl,
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
            ],
            socialFriend: [
              {
                localField: 'friends',
                foreignKey: 'friendSocialAccountId'
              }
            ]
          }
        }
      });
    })
    .run(function (SocialAccount) {
      console.log(SocialAccount);
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
