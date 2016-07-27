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
          description: 'Some description',
          state: 'auth.org'
        },
        {
          title: 'Providers',
          icon: 'mega-octicon octicon-gist-secret',
          description: 'Auth provider apps',
          state: 'auth.providers'
        },
        {
          title: 'Account',
          icon: 'fa fa-2x fa-user',
          description: 'Account',
          state: 'auth.account'
        }
      ]

    });

  }

  angular.module('authApiApp')
    .controller('HomeController', HomeController);

})();
