(function (ng) {
  'use strict';
  ng.module('authApiApp.admin.models')
    .run(function (Schema) {
      Schema.register({
        name: 'provider'
      });
    })
  ;

})(angular);
