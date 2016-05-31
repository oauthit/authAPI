(function () {
  'use strict';

  function AdminController(User) {

    let vm = this;
    vm.users = User.query();

    vm.delete = (user) => {
      user.$remove();
      this.users.splice(this.users.indexOf(user), 1);
    };
  }

  angular.module('authApiApp.admin')
    .controller('AdminController', AdminController);

})();
