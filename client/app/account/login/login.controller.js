'use strict';

var LoginController = function (saAuth, $state) {

  var me = this;

  me.user = {};
  me.errors = {};
  me.submitted = false;
  me.saAuth = saAuth;
  me.$state = $state;

  var catchFn = function (text404) {
    return function (err) {
      if (err.status === 404) {
        me.errors.other = text404;
      } else {
        me.errors.other = err.data.message || text404;
      }
      me.submitted = false;
    };
  };

  me.login = function () {

    var q;
    me.errors = {};
    me.submitted = true;

    if (me.user.mobileNumber && !me.smsId) {

      q = me.saAuth.loginWithMobileNumber(me.user.mobileNumber)

        .then(res => {
          console.log (res);
          me.smsId = res.data.ID;
          me.submitted = false;
        })

        .catch(catchFn('Wrong mobile number'));

    } else if (me.smsId && me.smsCode) {

      q = me.saAuth.authWithSmsCode (me.smsId, me.smsCode)

        .then(function(res){
          if (res.token) {
            $state.go('main', {'access-token': res.token});
          } else {
            me.errors.other = 'Error: got empty token';
          }
          me.submitted = false;
        })

        .catch(catchFn('Wrong SMS code'));

    }

    if (q) {
      me.busy = q;
      q.finally(function(){
        me.submitted = false;
      });
    }
  };

};

angular.module('authApiApp')
  .controller('LoginController', LoginController);
