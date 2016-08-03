(function () {
  'use strict';

  angular.module('authApiApp')
    .controller('OrgsController', function (InitCtrlService, schema, sabNgTable) {

      let vm = InitCtrlService.setup(this);

      let Org = schema.model('Org');

      let orgTable = {
        ngTable: {
          count: 12
        }
        // TODO: sabNgTable should cache getCount
        // bypassCache: false
      };

      vm.ngTableParams = sabNgTable.setup(orgTable, {
        getCount: Org.getCount,
        findAll: Org.findAll
      });

      angular.extend(vm,{
        orgTable: orgTable
      });

    })
  ;

})();
