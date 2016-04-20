'use strict';

function NavbarController($rootScope,
                          $scope,
                          $state,
                          Modal,
                          models,
                          Auth,
                          SettingsService) {

  var vm = this;
  var Agent = models.agent;

  var setCurrentAgent = function (agent) {
    SettingsService.setCurrentAgent(agent);
    vm.currentAgent = agent;
  };

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
    setCurrentAgent: setCurrentAgent,
    logout: logout
  });

  $rootScope.$on('logged-in', function () {
    Agent.bindAll({}, $scope, 'nav.agents');
  });

  $rootScope.$on('current-agent', function (ev,agent) {
    vm.currentAgent = agent;
  });

}

angular.module('authApiApp')
  .controller('NavbarController', NavbarController);
