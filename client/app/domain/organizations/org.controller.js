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
        getCount: function (params, options) {
          return Org.getCount(params, options);
        },

        findAll: function (params, options) {
          return Org.findAll(params, options);
        }
      });

    })
  ;

})();
