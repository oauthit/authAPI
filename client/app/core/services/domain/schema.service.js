'use strict';

export function schema(saSchema, $http) {
  'ngInject';
  return saSchema({

    getCount: function (params) {
      var resource = this;
      var bp = resource.getAdapter('http').defaults.basePath;
      var url = bp + '/' + resource.endpoint;
      var options = {
        params: angular.extend({'agg:': 'count'}, params || {})
      };

      return $http.get(url, options).then(function (res) {
        return parseInt(res.headers('x-aggregate-count')) || res.data && res.data.count;
      });
    },

    getList: function (params) {
      return this.findAll(params, {bypassCache: true});
    }

  });
}
