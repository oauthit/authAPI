'use strict';

angular.module('authApiApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('debt.invite', {
        abstract: true,
        template: '<div ui-view class="container"></div>'
      })
      .state('debt.invite.create', {
        url: '/invite/create',
        templateUrl: 'app/domain/invite/create/inviteCreate.html',
        controller: 'InviteCreateCtrl',
        controllerAs: 'vm'
      })
      .state('debt.invite.info', {
        url: '/invite/info/:id',
        templateUrl: 'app/domain/invite/info/inviteInfo.html',
        controller: 'InviteInfoCtrl',
        controllerAs: 'vm'
      });
  })
;
