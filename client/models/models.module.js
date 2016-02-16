'use strict';

(function () {

  angular.module('authApiApp.models', [
      'js-data'
    ])
    .config(function (DSProvider, DSHttpAdapterProvider) {
      angular.extend(DSProvider.defaults, {
        beforeCreate: function (resource, data, cb) {
          console.log('fine', data);
          data.id = uuid.v4();
          cb(null, data);
        }
      });
      angular.extend(DSHttpAdapterProvider.defaults, {
        basePath: 'http://localhost:9000/api/opr/'
      });
    });

}());
