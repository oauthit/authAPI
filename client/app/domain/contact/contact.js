'use strict';

angular.module('authApiApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('debt.contacts', {
        url: '/contacts',
        templateUrl: 'app/domain/contact/list/contactList.html',
        controller: 'ContactListCtrl',
        controllerAs: 'vm'
      })
      .state('debt.contact', {
        abstract: true,
        template: '<div ui-view></div>'
      })
      .state('debt.contact.add', {
        url: '/contact/add',
        templateUrl: 'app/domain/contact/add/contactAdd.html',
        controller: 'ContactAddCtrl',
        controllerAs: 'vm'
      });
  });
