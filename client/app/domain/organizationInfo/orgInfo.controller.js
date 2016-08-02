(function () {
  'use strict';

  angular.module('authApiApp')
    .controller('OrgInfoController', function (schema, $state, $scope) {

      var vm = this;

      var Org = schema.model('Org');

      var stateFilter = {
        id: $state.params.orgId
      };

      if ($state.params.isPublic) {
        stateFilter.isPublic = true;
      }

      Org.findAll(stateFilter);
      Org.bindOne(stateFilter.id, $scope, 'vm.org');

      angular.extend(vm, {
      });

    })
  ;

})();
