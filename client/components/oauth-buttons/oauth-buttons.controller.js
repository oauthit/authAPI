'use strict';

angular.module('authApiApp')
  .controller('OauthButtonsCtrl', function($window) {

    var OauthButtons = this;

    OauthButtons.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };

  });
