(function () {

  'use strict';

  angular.module('authApiApp.core.services')
    .factory('InitCtrlService', function (sabNgTable) {

      function setup(ctrl) {
        return angular.extend(ctrl, {
          setupNgTable: function setupNgTable(model) {
            return sabNgTable.setup(ctrl, model);
          }
        });
      }

      return {
        setup
      };

    })
  ;

})();
