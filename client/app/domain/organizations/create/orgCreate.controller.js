(function () {
  'use strict';

  angular.module('authApiApp')
    .controller('OrgCreateController', function (saFormlyConfigService) {
      var vm = this;



      angular.extend(vm, {
        org: {},
        fields: saFormlyConfigService.getConfigFieldsByKey('orgCreateFields'),
        onCancel: function (form) {
          vm.org = {};
          form.$setPristine();
        },
        onSubmit: function (form) {
          Account.save(vm.account.id)
            .then(function () {
              saMessageService.success('Account have been updated', 'Success!');
              form.$setPristine();
            })
            .catch(sabErrorsService.addError);
        }
      });
    })
  ;

})();
