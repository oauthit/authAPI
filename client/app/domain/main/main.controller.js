'use strict';

(function () {

  function MainController($state, Auth) {

    var vm = this;

    let accessToken = $state.params ['access-token'];

    if (accessToken) {
      Auth.login(accessToken, function (err) {
        if (!err) {
          $state.go('debt.main', false, {inherit: false});
        }
      });
    }

    vm.data = [
      {
        sref: 'debt.operation.list',
        name: 'Operations',
        addSref: 'debt.operation.add'
      },{
        sref: 'debt.contact.list',
        name: 'Contacts',
        addSref: 'debt.contact.add'
      },{
        sref: 'debt.invite.list',
        name: 'Invites',
        addSref: 'debt.invite.add'
      }
    ];

  }

  angular.module('authApiApp')
    .controller('MainController', MainController);

})();
