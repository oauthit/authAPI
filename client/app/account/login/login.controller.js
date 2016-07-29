'use strict';

var LoginController = function (Auth, $state, schema) {

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
  vm.Auth = Auth;
  vm.$state = $state;

  var catchFn = function (text404) {
    return function (err) {
      if (err.status === 404) {
        vm.errors.other = text404;
      } else {
        vm.errors.other = err.data.message || text404;
      }
      vm.submitted = false;
    };
  };

  vm.login = function () {

    var q;
    vm.errors = {};
    vm.submitted = true;

    if (vm.user.mobileNumber && !vm.smsId) {

      q = vm.Auth.loginWithMobileNumber(vm.user.mobileNumber)

        .then(res => {
          console.log(res);
          vm.smsId = res.data.ID;
          vm.submitted = false;
        })

        .catch(catchFn('Wrong mobile number'));

    } else if (vm.smsId && vm.smsCode) {

      q = vm.Auth.authWithSmsCode(vm.smsId, vm.smsCode)

        .then(function (res) {
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
      q.finally(function () {
        vm.submitted = false;
      });
    }
  };

};

angular.module('authApiApp')
  .controller('LoginController', LoginController);
