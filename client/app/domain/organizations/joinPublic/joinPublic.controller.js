(function () {
  'use strict';

  angular.module('authApiApp')
    .controller('OrgJoinPublicController', function ($scope, InitCtrlService, schema, Auth) {

      let vm = InitCtrlService.setup(this);
      var Org = schema.model('Org');
      var stateFilter = {
        isPublic: true
      };

      Org.findAllWithRelations(stateFilter)('OrgAccount');
      Org.bindAll(stateFilter, $scope, 'vm.orgs');

      angular.extend(vm, {
        ngTable: {
          count: 12
        }
      });

    })
  ;

})();
