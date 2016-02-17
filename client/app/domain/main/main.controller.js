'use strict';

(function () {

  function MainController($state, Auth, InitService) {

    let accessToken = $state.params ['access-token'];

    if (accessToken) {
      Auth.login(accessToken, function (err) {
        if (!err) {
          InitService.init();
          $state.go('debt.main', false, {inherit: false});
        }
      });
    }
  }

  angular.module('authApiApp')
    .controller('MainController', MainController);

})();
