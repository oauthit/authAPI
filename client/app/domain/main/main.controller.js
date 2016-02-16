'use strict';

(function () {

  class MainController {

    constructor($state, Auth) {
      this.awesomeThings = [];
      this.$state = $state;

      let accessToken = $state.params ['access-token'];

      if (accessToken) {
        Auth.login(accessToken, function (err) {
          if (!err) {
            $state.go('debt.main', false, {inherit: false});
          }
        });
      }
    }

  }

  angular.module('authApiApp')
    .controller('MainController', MainController);

})();
