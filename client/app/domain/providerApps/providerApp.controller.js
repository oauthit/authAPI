(function () {
  'use strict';

  angular.module('authApiApp')
    .controller('ProviderAppController', function (InitCtrlService, schema) {

      let vm = InitCtrlService.setup(this);

      let Provider = schema.model('ProviderApp');

      angular.extend(vm, {
        ngTable: {
          count: 12
        }
      });

      vm.setupNgTable({
        getCount: Provider.getCount,
        findAll: Provider.findAll
      });

    })
  ;

})();
