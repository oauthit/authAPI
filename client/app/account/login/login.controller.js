'use strict';

(function () {

  function LoginController($state, schema) {

    const vm = angular.extend(this, {
      user: {},
      errors: {},
      login
    });

    const {ProviderApp} = schema.models();

    ProviderApp.findAll()
      .then(data => {
        vm.buttons = _.map(data, app => app.oauthButton());
      });

    function catchFn (text404) {
      return err => {
        if (err.status === 404) {
          vm.errors.other = text404;
        } else {
          vm.errors.other = err.data.message || text404;
        }
        vm.submitted = false;
      };
    }

    function login () {

      var q;
      vm.errors = {};
      vm.submitted = true;

      if (vm.user.mobileNumber && !vm.smsId) {

        q = vm.Auth.loginWithMobileNumber(vm.user.mobileNumber)

          .then(res => {
            vm.smsId = res.data.ID;
            vm.submitted = false;
          })

          .catch(catchFn('Wrong mobile number'));

      } else if (vm.smsId && vm.smsCode) {

        q = vm.Auth.authWithSmsCode(vm.smsId, vm.smsCode)

          .then(res => {
            if (res.token) {
              $state.go('main', {'access-token': res.token});
            } else {
              vm.errors.other = 'Error: got empty token';
            }
            vm.submitted = false;
          })

          .catch(catchFn('Wrong SMS code'));

      }

      if (q) {
        vm.busy = q;
        q.finally(() => vm.submitted = false);
      }

    }

  }

  angular.module('authApiApp')
    .controller('LoginController', LoginController);

})();
