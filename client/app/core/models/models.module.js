'use strict';

(function () {

  function Schema(saSchema) {
    //pass object to saSchema to override methods
    return saSchema();
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
    .run(function(DS,$rootScope){
      $rootScope.$on('logged-off',function(){
        DS.clear();
      });
    });


}());
