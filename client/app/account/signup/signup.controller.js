'use strict';

(function () {

  function SignupController(Auth, $state, schema) {

    var vm = this;

    var ProviderApp = schema.model('ProviderApp');
    ProviderApp.findAll()
      .then(function (data) {
        vm.buttons = _.map(data, function(app) {
          return app.oauthButton();
        });
      });

    vm.user = {};
    vm.errors = {};
    vm.submitted = false;

    vm.register = function (form) {

      vm.submitted = true;
      var user = vm.user;

      if (form.$valid) {
        Auth.createUser({
          name: user.name,
          email: user.email,
          password: user.password
        })
          .then(() => {
            // Account created, redirect to home
            this.$state.go('main');
          })
          .catch(function (err) {
            err = err.data;
            vm.errors = {};

            // Update validity of form fields that match the mongoose errors
            _.each(err.errors, function (error, field) {
              form[field].$setValidity('mongoose', false);
              vm.errors[field] = error.message;
            });
          });
      }
    };
  }

  angular.module('authApiApp')
    .controller('SignupController', SignupController);

})();
