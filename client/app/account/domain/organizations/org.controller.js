(function () {
  'use strict';

  angular.module('authApiApp')
    .controller('OrgController', function (InitCtrlService, schema) {

      let vm = InitCtrlService.setup(this);

      let Org = schema.model('org');

      angular.extend(vm, {
        ngTable: {
          count: 12
        }
      });

      vm.setupNgTable({
        getCount: function (params, options) {
          let p = params || {};
          let o = options || {};
          return Org.getCount([p, o]);
        },

        findAll: function (params, o) {
          return Org.findAll(angular.extend({}, params), o);
        }
      });

    })
  ;

})();
