'use strict';

(function () {

  angular.module('authApiApp.admin.models')
    .run(function (schema, saFormlyConfigService) {
      schema.register({
        name: 'Org',
        relations: {
          hasMany: {
            OrgProviderApp: {
              foreignKey: 'orgId',
              localField: 'providerApps'
            },
            OrgAccount: {
              foreignKey: 'orgId',
              localField: 'accounts'
            }
          },
          hasOne: {
            OrgApp: {
              foreignKey: 'orgId',
              localField: 'app'
            }
          }
        }
      });

      var orgCreateFields = [
        {
          key: 'name',
          type: 'input',
          templateOptions: {
            label: 'Name',
            type: 'text',
            required: true,
            maxlength: 30
          }
        },
        {
          key: 'isPublic',
          type: 'input',
          templateOptions: {
            label: 'Is public?',
            type: 'checkbox'
          }
        }
      ];

      saFormlyConfigService.setConfig('orgCreateFields', orgCreateFields);
    })
  ;

})();