'use strict';

angular.module('authApiApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('debt.contact', {
        abstract: true,
        template: '<div ui-view class="container"></div>'
      })
      .state('debt.contact.list', {
        url: '/contacts',
        templateUrl: 'app/domain/contact/list/contactList.html',
        controller: 'ContactListCtrl',
        controllerAs: 'vm'
      })
      .state('debt.contact.add', {
        url: '/contact/add',
        templateUrl: 'app/domain/contact/add/contactAdd.html',
        controller: 'ContactAddCtrl',
        controllerAs: 'vm'
      })
      .state('debt.contact.info', {
        url: '/contact/info/:id',
        templateUrl: 'app/domain/contact/info/contactInfo.html',
        controller: 'ContactInfoCtrl',
        controllerAs: 'vm'
      });
  });
