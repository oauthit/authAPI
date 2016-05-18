'use strict';

(function () {

  function Schema(saSchema, $http, appConfig) {
    //pass object to saSchema to override methods
    return saSchema({
      getCount: function (params) {

        return $http
          .get(
            appConfig.jsDataBasePath + '/' + this.endpoint,
            {
              params: angular.extend({
                'agg:': 'count'
              }, params || {})
            }
          )

          .then(function (res) {
            return parseInt(res.headers('x-aggregate-count'));
          });
      }
    });
  }

  angular.module('authApiApp.core.models', [
      'sistemium',
      'authApiApp.constants'
    ])
    .config(function (DSHttpAdapterProvider, appConfig) {
      angular.extend(DSHttpAdapterProvider.defaults, {
        basePath: appConfig.jsDataBasePath
      });
    })
    .service('Schema', Schema)
    .service('models', function (Schema) {
      return Schema.models();
    })
    .run(function (DS, $rootScope) {
      $rootScope.$on('logged-off', function () {
        DS.clear();
      });
    });


}());
