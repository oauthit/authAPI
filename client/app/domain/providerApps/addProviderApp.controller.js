(function () {
  'use strict';

  angular.module('authApiApp')
    .controller('AddProviderAppController', function (saFormlyConfigService, sabErrorsService, saMessageService, schema) {
      var vm = this;

      var ProviderApp = schema.model('ProviderApp');
      var fields = saFormlyConfigService.getConfigFieldsByKey('providerApp');

      function undoChanges() {
        ProviderApp.revert(vm.providerApp);
      }

      angular.extend(vm, {
        fields: fields,

        onCancel: function (form) {
          undoChanges();
          form.$setPristine();
        },

        onSubmit: function (form) {
          ProviderApp.create(vm.providerApp)
            .then(function () {
              saMessageService.success('Provider app have been saved', 'Success!');
              form.$setPristine();
            })
            .catch(sabErrorsService.addError);
        }
      });
    });

})();
