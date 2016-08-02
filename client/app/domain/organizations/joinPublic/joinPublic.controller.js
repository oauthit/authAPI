(function () {
  'use strict';

  angular.module('authApiApp')
    .controller('OrgJoinPublicController', function (InitCtrlService, schema) {

      let vm = InitCtrlService.setup(this);
      var Org = schema.model('Org');

      Org.findAll({isPublic: 1}).then(res => {
        vm.publicOrgs = res;
      });

      angular.extend(vm, {
        ngTable: {
          count: 12
        }
      });

    })
  ;

})();
