'use strict';

(function () {

  function HomeController($state, Auth) {

    let accessToken = $state.params ['access-token'];

    if (accessToken) {
      Auth.login(accessToken, function (err) {
        if (!err) {
          $state.go('auth.main', false, {inherit: false});
        }
      });
    }

    let vm = this;

    angular.extend(vm, {

      sections: [
        {
          title: 'Organizations',
          icon: 'mega-octicon octicon-organization',
          description: 'join existing or create yours',
          state: 'auth.org'
        },
        {
          title: 'Providers',
          icon: 'mega-octicon octicon-gist-secret',
          description: 'browse available applications',
          state: 'auth.providers'
        },
        {
          title: 'Account',
          icon: 'mega-octicon octicon-person',
          description: 'manage your auth personae',
          state: 'auth.account'
        }
      ]

    });

  }

  angular.module('authApiApp')
    .controller('HomeController', HomeController);

})();
