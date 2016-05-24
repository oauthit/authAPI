(function (ng) {
  'use strict';
   ng.module('authApiApp.core.services')
     .factory('Auth', function (saAuth) {
       var config = {
         url: 'someUrl'
       };
       return saAuth(config);
     })

})(angular);
