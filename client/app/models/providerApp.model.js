'use strict';

(function () {

  angular.module('authApiApp.admin.models')
    .run(function (schema, saFormlyConfigService) {

      schema.register({
        name: 'ProviderApp',
        relations: {
          hasMany: {
            OrgProviderApp: {
              foreignKey: 'providerAppId',
              localField: 'orgProviderApps'
            },
            ProviderAccount: {
              foreignKey: 'providerAppId',
              localField: 'providerAccounts'
            }
          }
        },
        methods: {
          oauthButton: function() {
            var label = [this.provider, this.name];
            return {
              aClass: 'btn-' + this.provider,
              iClass: 'fa fa-' + this.provider,
              oauthPath: label.join('/'),
              title: _.startCase(label.join(' '))
            };
          }
        }
      });

      var providerAppFields = [
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
          key: 'provider',
          type: 'input',
          templateOptions: {
            label: 'Provider',
            type: 'text',
            required: true,
            maxlength: 30
          }
        },
        {
          key: 'code',
          type: 'input',
          templateOptions: {
            label: 'Code',
            type: 'text',
            required: true,
            maxlength: 30
          }
        },
        {
          key: 'clientId',
          type: 'input',
          templateOptions: {
            label: 'Client ID',
            type: 'text',
            required: true,
            maxlength: 100
          }
        },
        {
          key: 'clientSecret',
          type: 'input',
          templateOptions: {
            label: 'Client Secret',
            type: 'text',
            required: true,
            maxlength: 100
          }
        },
        {
          key: 'url',
          type: 'input',
          templateOptions: {
            label: 'Url',
            type: 'text',
            required: true,
            maxlength: 30
          }
        },
      ];

      saFormlyConfigService.setConfig('providerApp', providerAppFields);
    })
  ;

})();
