'use strict';

(function () {

  angular.module('authApiApp')
    .service('Account', function (DS, appConfig) {
      return DS.defineResource({
        name: 'account',
        basePath: appConfig.jsDataBasePathForAA
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
