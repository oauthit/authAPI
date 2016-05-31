(function (ng) {
  'use strict';
  ng.module('authApiApp.admin.models', ['authApiApp.core.services'])
    .config(function (DSHttpAdapterProvider) {
      angular.extend(DSHttpAdapterProvider.defaults, {
        basePath: '/api'
      });
    })
  ;

})(angular);
