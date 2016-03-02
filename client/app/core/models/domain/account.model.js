'use strict';

(function () {

  angular.module('authApiApp')
    .service('Account', function (DS) {
      return DS.defineResource({
        name: 'account',
        //todo pass from sharedConfig
        basePath: 'http://localhost:9000/api/aa/'
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
