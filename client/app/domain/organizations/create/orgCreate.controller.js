(function () {
  'use strict';

  angular.module('authApiApp')
    .controller('OrgCreateController', function (saFormlyConfigService, schema, $state, sabErrorsService, saMessageService) {

      var vm = this;
      var Org = schema.model('Org');

      angular.extend(vm, {

        org: Org.createInstance(),
        fields: saFormlyConfigService.getConfigFieldsByKey('orgCreateFields'),

        onCancel: function () {
          $state.go('^');
        },

        onSubmit: function (form) {
          Org.create(vm.org)
            .then(function () {
              saMessageService.success('Org has been created', 'Success!');
              form.$setPristine();
            })
            .catch(sabErrorsService.addError);
        }

      });

    })
  ;

})();
