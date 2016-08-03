'use strict';

(function () {

  angular.module('authApiApp.admin.models')
    .run(function (schema, saFormlyConfigService) {

      schema.register({
        name: 'OrgAccount',
        relations: {
          hasOne: {
            Account: {
              foreignKey: 'accountId',
              localField: 'account'
            },
            Org: {
              foreignKey: 'orgId',
              localField: 'org'
            }
          }
        }
      });

      var joinFelds = [
        {
          key: 'name',
          type: 'input',
          templateOptions: {
            label: 'Name in the organization',
            type: 'text',
            required: true,
            maxlength: 30
          }
        }
      ];

      saFormlyConfigService.setConfig('OrgAccount.join', joinFelds);

    })
  ;

})();
