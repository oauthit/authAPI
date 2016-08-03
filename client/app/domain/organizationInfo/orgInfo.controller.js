(function () {
  'use strict';

  angular.module('authApiApp')
    .controller('OrgInfoController', function (schema, $state, $stateParams, $scope, Auth) {

      var vm = this;

      var Org = schema.model('Org');
      var OrgAccount = schema.model('OrgAccount');

      var stateFilter = {
        id: $state.params.orgId
      };

      if ($state.params.isPublic || /join$/.test($state.current.name)) {
        stateFilter.isPublic = true;
      }

      Org.findAll(stateFilter);
      Org.bindOne(stateFilter.id, $scope, 'vm.org');

      Auth.getCurrentUser(user => {

        var orgAccount = {
          orgId: stateFilter.id,
          accountId: user.id
        };

        OrgAccount.findAll(orgAccount, {bypassCache: true})
          .then(oa=>{
            vm.orgAccount = oa.length && oa[0] ||
              OrgAccount.createInstance(angular.extend(orgAccount,{
                name: user.name
              }));
          });



      });

      angular.extend(vm, {
        join: function () {
          OrgAccount.create(vm.orgAccount)
            .then(()=>{
              Org.find(stateFilter.id, {bypassCache: true});
            });
        },
        leave: function () {
          OrgAccount.destroy(vm.orgAccount)
            .then(()=>{
              Org.find(stateFilter.id, {bypassCache: true});
            });
        }
      });

    })
  ;

})();
