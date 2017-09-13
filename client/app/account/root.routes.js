'use strict';

(function () {

  angular.module('authApiApp')

    .config(rootRoutes)

    .run($rootScope => {
      $rootScope.$on('$stateChangeStart', logoutReferrerDecorator);
    });

  function logoutReferrerDecorator(event, next, nextParams, current) {
    if (next.name === 'logout' && current && current.name && !current.authenticate) {
      next.referrer = current.name;
    }
  }

  function rootRoutes($stateProvider) {

    $stateProvider

      .state('auth.login', {
        url: '/login',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      })

      .state('auth.logout', {
        url: '/logout?referrer',
        referrer: 'auth.main',
        template: '',
        controller: function ($state, Auth) {
          let referrer = $state.params.referrer ||
            $state.current.referrer ||
            'auth.main';
          Auth.logout();
          $state.go(referrer);
        }
      })

      .state('auth.signup', {
        url: '/signup',
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupController',
        controllerAs: 'vm'
      })

      .state('auth.settings', {
        url: '/settings',
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsController',
        controllerAs: 'vm',
        authenticate: true
      });

  }

})();
