'use strict';

(function () {

  angular.module('authApiApp')

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
    .run(function (Schema, Account, appConfig, saFormlyConfigService) {

      Schema.register({
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

      Schema.register({
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
            ]
          }
        }
      });

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

      saFormlyConfigService.setConfig('accountInfo', accountFields);
    });

}());
