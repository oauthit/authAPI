'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    'title': 'Home',
    'state': 'debt.main'
  }];

  isCollapsed = true;
  //end-non-standard

  constructor(Auth, InitService) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
    Auth.getCurrentUser(function () {
      InitService.init();
    });
  }
}

angular.module('authApiApp')
  .controller('NavbarController', NavbarController);
