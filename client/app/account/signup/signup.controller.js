'use strict';

(function () {

  function SignupController(Auth, $state) {

    var vm = this;

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
            var err = err.data;
            vm.errors = {};

            // Update validity of form fields that match the mongoose errors
            _.each(err.errors, function (error, field) {
              form[field].$setValidity('mongoose', false);
              vm.errors[field] = error.message;
            });
          });
      }
    }
  }

  angular.module('authApiApp')
    .controller('SignupController', SignupController);

})();
