'use strict';

export default function ($scope, $state, InitCtrlService, schema, Auth) {

  let vm = InitCtrlService.setup(this);
  var Org = schema.model('Org');
  var OrgAccount = schema.model('OrgAccount');
  var stateFilter = {
    isPublic: true
  };

  function refresh(account) {
    Org.findAll(stateFilter)
      .then(orgs => {
        _.each(orgs, org => {
          OrgAccount.findAll({
            orgId: org.id,
            accountId: account.id
          });
        });
      });
  }

  Org.bindAll(stateFilter, $scope, 'vm.orgs');


  angular.extend(vm, {
    ngTable: {
      count: 12
    },

    joinOrLeave: function (org) {
      let state = `^.${org.isIAmAMember() ? 'leave' : 'join'}`;
      $state.go(state, {orgId: org.id});
    }
  });

  Auth.getCurrentUser(refresh);

}
