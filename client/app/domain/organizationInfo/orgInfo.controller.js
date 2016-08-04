(function () {
  'use strict';

  angular.module('authApiApp')
    .controller('OrgInfoController', function (schema, $state, $stateParams, $scope, Auth, Modal, saFormlyConfigService) {

      var vm = this;

      var Org = schema.model('Org');
      var OrgAccount = schema.model('OrgAccount');

      var joinFields = saFormlyConfigService.getConfigFieldsByKey('OrgAccount.join');

      var stateFilter = {
        id: $state.params.orgId
      };

      if ($state.params.isPublic || /join$/.test($state.current.name)) {
        stateFilter.isPublic = true;
      }

      Org.findAll(stateFilter);
      Org.bindOne(stateFilter.id, $scope, 'vm.org');


      Auth.getCurrentUser(user => {

        var orgAccountFilter = {
          orgId: stateFilter.id,
          accountId: user.id
        };

        OrgAccount.findAll(orgAccountFilter, {bypassCache: true})
          .then(oa=> {
            vm.orgAccount = oa.length && oa[0] ||
              OrgAccount.createInstance(angular.extend(orgAccountFilter, {
                name: user.name
              }));
          });

      });

      angular.extend(vm, {

        joinFields: joinFields,

        join: function () {
          OrgAccount.create(vm.orgAccount)
            .then(()=> {
              Org.find(stateFilter.id, {bypassCache: true});
            });
        },

        leave: function () {
          OrgAccount.destroy(vm.orgAccount)
            .then(()=> {
              Org.find(stateFilter.id, {bypassCache: true});
            });
        },

        deleteClick: function () {
          Modal.confirm.delete(function () {
            Org.destroy(vm.org)
              .then(() => $state.go('auth.org'));
          })(vm.org.name);

        }

      });

    })
  ;

})();
