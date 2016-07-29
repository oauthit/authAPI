'use strict';

(function () {

  angular.module('authApiApp.admin.models')
    .run(function (schema) {

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
    })
  ;

})();
