'use strict';

(function () {

  angular.module('authApiApp.admin.models')
    .run(function (schema, saFormlyConfigService) {

      schema.register({
        name: 'OrgAccount',
        relations: {
          hasOne: {
            Account: {
              localKey: 'accountId',
              localField: 'account'
            },
            Org: {
              localKey: 'orgId',
              localField: 'org'
            }
          },
          hasMany: {
            OrgAccountRole: {
              foreignKey: 'orgAccountId',
              localField: 'orgAccountRoles'
            }
          }
        },

        methods: {
          getOrgAccountRoles: function () {
            return _.map(_.map(this.orgAccountRoles, 'role'), 'name');
          }
        }
      });

      var joinFields = [
        {
          key: 'name',
          type: 'input',
          templateOptions: {
            label: 'Name in the organization:',
            type: 'text',
            required: true,
            maxlength: 30
          }
        }
      ];

      var orgAccount = [
        {
          key: 'name',
          type: 'input',
          templateOptions: {
            label: 'Name of organization account:',
            type: 'text',
            required: true,
            maxlength: 30
          }
        }
      ];

      saFormlyConfigService.setConfig('OrgAccount.join', joinFields);
      saFormlyConfigService.setConfig('OrgAccount.edit', orgAccount);

    })
  ;

})();
