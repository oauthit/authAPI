'use strict';

(function () {

  angular.module('authApiApp.admin.models')
    .run(function (schema, saFormlyConfigService) {
      schema.register({
        name: 'Account',
        relations: {
          hasMany: {
            ProviderAccount: {
              foreignKey: 'accountId',
              localField: 'providerAccounts'
            },
            OrgAccount: {
              foreignKey: 'accountId',
              localField: 'orgAccounts'
            }
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
    })
  ;

})();
