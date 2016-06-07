'use strict';

(function () {

  angular.module('authApiApp')
    .run(function ($rootScope, $state, Auth, sabErrorsService) {
      // Redirect to login if route requires auth and the user is not logged in, or doesn't have required role
      $rootScope.$on('$stateChangeStart', (event, next) => {
        sabErrorsService.clear();
        if (!next.authenticate) {
          return;
        }

        if (typeof next.authenticate === 'string') {
          Auth.hasRole(next.authenticate, _.noop)
            .then((has) => {
              if (has) {
                return;
              }

              event.preventDefault();
              return Auth.isLoggedIn(_.noop).then((is) => {
                $state.go(is ? 'auth.main' : 'auth.login');
              });
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          Auth.isLoggedIn(_.noop)
            .then((is) => {
              if (is) {
                return;
              }

              event.preventDefault();
              $state.go('main');
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    });

})();
