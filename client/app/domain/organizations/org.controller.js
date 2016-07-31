(function () {
  'use strict';

  angular.module('authApiApp')
    .controller('OrgController', function (InitCtrlService, schema) {

      let vm = InitCtrlService.setup(this);

      let Org = schema.model('Org');

      angular.extend(vm, {
        ngTable: {
          count: 12
        }
      });

      vm.setupNgTable({
        getCount: Org.getCount,
        findAll: Org.findAll
      });

    })
  ;

})();
