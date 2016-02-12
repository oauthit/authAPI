'use strict';

(function() {

class MainController {

  constructor($state, localStorageService) {
    this.awesomeThings = [];

    let accessToken = $state.params['access_token'];
    if (accessToken) {
      localStorageService.set('access_token', accessToken);
    }
  }

  addThing() {

  }

  deleteThing() {

  }
}

angular.module('authApiApp')
  .controller('MainController', MainController);

})();
