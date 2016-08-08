(function () {
  'use strict';

  angular.module('authApiApp')
    .controller('ProviderAppController', function (InitCtrlService, schema, $state, Auth) {

      let vm = InitCtrlService.setup(this);

      let Provider = schema.model('ProviderApp');

      function loginOauth(app, event) {
        _.result(event, 'preventDefault');
        Auth.loginOauth(app);
      }

      function rowClick(row, event) {
        if (_.result(event, 'isDefaultPrevented')) {
          return;
        }
        $state.go('auth.providerAccounts', {providerId: row.id});
      }

      angular.extend(vm, {
        ngTable: {
          count: 12
        },
        loginOauth: loginOauth,
        rowClick: rowClick
      });

      vm.setupNgTable({
        getCount: Provider.getCount,
        findAll: Provider.findAll
      });

    })
  ;

})();
