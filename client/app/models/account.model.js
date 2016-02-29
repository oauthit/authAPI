'use strict';

(function () {

  angular.module('authApiApp')
    .service('Account', function (DS) {
      return DS.defineResource({
        name: 'account'
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
            disabled: true
          }
        }
      ];

      FormlyConfigService.setConfig('accountInfo', accountFields);
    });

}());
