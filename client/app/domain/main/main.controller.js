'use strict';

(function () {

  function MainController($state, Auth) {

    let accessToken = $state.params ['access-token'];

    if (accessToken) {
      Auth.login(accessToken, function (err) {
        if (!err) {
          $state.go('debt.main', false, {inherit: false});
        }
      });
    }
  }

  angular.module('authApiApp')
    .controller('MainController', MainController);

})();
