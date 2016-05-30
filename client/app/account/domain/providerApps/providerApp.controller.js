(function () {
  'use strict';

  angular.module('authApiApp')
    .controller('ProviderAppController', function (InitCtrlService, Schema) {

      let vm = InitCtrlService.setup(this);

      let Provider = Schema.model('providerApp');

      angular.extend(vm, {
        ngTable: {
          count: 12
        }
      });

      vm.setupNgTable({
        getCount: function (params, o) {
          let p = angular.extend({}, params);
          return Provider.getCount([p, o]);
        },

        findAll: function (params, o) {
          return Provider.findAll(angular.extend({}, params), o);
        }
      });

    })
  ;

})();
