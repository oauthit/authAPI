'use strict';

function NavbarController($state, $rootScope, $scope,
                          schema,
                          Modal,
                          Auth,
                          SettingsService) {

  var vm = this;
  var Org = schema.model('Org');

  var logout = function () {
    Modal.confirm.confirm(function () {
      $state.go('auth.logout');
    })();
  };

  function setCurrentOrg(org) {
    SettingsService.setCurrentOrg(org);
    vm.currentOrg = org;
  }

  angular.extend(vm, {
    menu: [{
      'title': 'Home',
      'state': 'auth.main'
    }],

    isCollapsed: true,

    isLoggedIn: Auth.isLoggedIn,
    isAdmin: Auth.isAdmin,
    getCurrentUser: Auth.getCurrentUser,
    logout: logout,
    setCurrentOrg: setCurrentOrg
  });

  $rootScope.$on('logged-in', function () {
    Org.bindAll({}, $scope, 'nav.orgs');
  });

  $rootScope.$on('current-org', function (ev, org) {
    vm.currentOrg = org;
  });

}

angular.module('authApiApp')
  .controller('NavbarController', NavbarController);
