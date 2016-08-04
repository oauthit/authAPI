'use strict';

(function () {

  angular.module('authApiApp')
    .run(function ($rootScope, $state, Auth, sabErrorsService) {
      // Redirect to login if route requires auth and the user is not logged in, or doesn't have required role
      $rootScope.$on('$stateChangeStart', (event, next) => {

        let nextAuthenticate = _.get(next, 'data.authenticate');
        console.log('###########next.authenticate:', nextAuthenticate);
        sabErrorsService.clear();
        if (!nextAuthenticate) {
          return;
        }

        if (typeof nextAuthenticate === 'string') {
          Auth.hasRole(nextAuthenticate, _.noop)
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
                Auth.getCurrentUser(_.noop);
              } else {
                event.preventDefault();
                $state.go('main');
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    });

})();
