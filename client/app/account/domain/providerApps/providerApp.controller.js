(function () {
  'use strict';

  angular.module('authApiApp')
    .controller('ProviderAppController', function (InitCtrlService, schema) {

      let vm = InitCtrlService.setup(this);

      let Provider = schema.model('ProviderApp');

      angular.extend(vm, {
        ngTable: {
          count: 12
        },
        click: function (row) {

          Provider.loadRelations(row, [], {bypassCache: true})
            .then(() => {
              console.log(row);
            })
        }
      });

      vm.setupNgTable({
        getCount: function (params, options) {
          let p = params || {};
          let o = options || {};
          return Provider.getCount([p, o]);
        },

        findAll: function (params, o) {
          return Provider.findAll(angular.extend({}, params), o);
        }
      });

    })
  ;

})();
