'use strict';

angular.module('authApiApp')
  .controller('OauthButtonsCtrl', function($window) {

    var OauthButtons = this;

    OauthButtons.buttons = [{
      aClass: 'btn-facebook',
      iClass: 'fa fa-facebook',
      oauthPath: 'facebook/debtee',
      title: 'Facebook'
    }, {
      aClass: 'btn-google',
      iClass: 'fa fa-google-plus',
      oauthPath: 'google/debtee',
      title: 'Google+'
    }, {
      aClass: 'btn-twitter',
      iClass: ['fa', 'fa-twitter'],
      oauthPath: 'twitter',
      title: 'Twitter'
    }, {
      aClass: 'btn-openid',
      iClass: ['glyphicon', 'glyphicon-phone'],
      oauthPath: 'sms/sms',
      title: 'mobile number'
    }];

    OauthButtons.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };

  });
