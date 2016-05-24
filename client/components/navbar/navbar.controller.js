'use strict';

function NavbarController($state,
                          Modal,
                          Auth) {

  var vm = this;

  var logout = function () {
    Modal.confirm.confirm(function () {
      $state.go('debt.logout');
    })();
  };

  angular.extend(vm, {
    menu: [{
      'title': 'Home',
      'state': 'debt.main'
    }],

    isCollapsed: true,

    isLoggedIn: Auth.isLoggedIn,
    isAdmin: Auth.isAdmin,
    getCurrentUser: Auth.getCurrentUser,
    logout: logout
  });


}

angular.module('authApiApp')
  .controller('NavbarController', NavbarController);
