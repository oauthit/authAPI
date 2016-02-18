'use strict';

(function () {

  angular.module('authApiApp.models', [
      'js-data'
    ])
    .config(function (DSProvider, DSHttpAdapterProvider, appConfig) {
      angular.extend(DSProvider.defaults, {
        beforeCreate: function (resource, data, cb) {
          data.id = uuid.v4();
          cb(null, data);
        },
        //afterCreateInstance: function (resource, instance) {
        //  if (!instance.id) {
        //    instance.id = uuid.v4();
        //  }
        //}
      });
      angular.extend(DSHttpAdapterProvider.defaults, {
        basePath: appConfig.jsDataBasePath,
        httpConfig: {
          headers: {
            'X-Return-Post': 'true'
          }
        }
      });
    });

}());
