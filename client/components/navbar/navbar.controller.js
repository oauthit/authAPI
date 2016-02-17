'use strict';

function NavbarController($rootScope, $scope, Agent, Auth, SettingsService) {

  var vm = this;

  var setCurrentAgent = function (agent) {
    SettingsService.setCurrentAgent(agent);
    vm.currentAgent = agent;
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
    setCurrentAgent: setCurrentAgent
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
