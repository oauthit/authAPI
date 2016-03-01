'use strict';

(function () {

  angular.module('authApiApp')
    .factory('ModelService', function ($http, DS) {

      function extend(model) {
        model.getCount = function (params) {
          return $http.get(
            this.getAdapter('http').defaults.basePath + this.endpoint, {
              params: angular.extend({'agg:': 'count'}, params || {})
            }).then(function (res) {
            return parseInt(res.headers('x-aggregate-count'));
          });
        };

        return model;
      }

      function define(cfg) {
        return extend(DS.defineResource(cfg));
      }

      return {
        define: define
      };
    })
  ;

}());
