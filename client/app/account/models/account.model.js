(function (ng) {
  'use strict';
  ng.module('authApiApp.admin.models')
    .run(function (schema, saFormlyConfigService) {
      schema.register({
        name: 'Account',
        relations: {
          hasMany: {
            ProviderAccount: {
              foreignKey: 'accountId',
              localField: 'providerAccounts'
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

})(angular);
