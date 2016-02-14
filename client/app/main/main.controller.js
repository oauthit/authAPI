'use strict';

(function() {

class MainController {

  constructor($state, Auth) {
    this.awesomeThings = [];

    let accessToken = $state.params ['access-token'];

    if (accessToken) {
      Auth.login (accessToken,function (err) {
        if (!err) {
          $state.go ('main',false, {inherit:false});
        }
      });
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
