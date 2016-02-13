'use strict';

(function() {

class MainController {

  constructor($state, Auth) {
    this.awesomeThings = [];

    let accessToken = $state.params ['access-token'];

    if (accessToken) {
      Auth.login (accessToken);
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
