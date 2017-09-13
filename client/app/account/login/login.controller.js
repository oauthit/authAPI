'use strict';

(function () {

  function LoginController($state, schema) {

    const vm = this

    const {ProviderApp} = schema.models();

    vm.cgBusy = ProviderApp.findAll()
      .then(data => {
        vm.buttons = _.map(data, app => app.oauthButton());
      });

    /*
    Functions
     */

  }

  angular.module('authApiApp')
    .controller('LoginController', LoginController);

})();
