'use strict';

(function () {

  angular.module('authApiApp.models', [
      'js-data'
    ])
    .config(function (DSProvider, DSHttpAdapterProvider) {
      angular.extend(DSProvider.defaults, {});
      angular.extend(DSHttpAdapterProvider.defaults, {
        basePath: 'http://localhost:9000/api/opr/'
      });
    });

}());
