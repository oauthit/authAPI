'use strict';

(function () {

  angular.module('authApiApp.admin.models', ['authApiApp.core.services'])
    .config(function (DSHttpAdapterProvider) {
      angular.extend(DSHttpAdapterProvider.defaults, {
        basePath: '/api'
      });
    });

})();
