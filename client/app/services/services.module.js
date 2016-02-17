'use strict';

(function () {

  angular.module('authApiApp.services', [
    'authApiApp.models',
    'authApiApp.auth'
  ]).run (function(InitService){
    console.log (InitService);
  });

}());
