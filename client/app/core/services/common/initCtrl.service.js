'use strict';

(function () {

  angular.module('authApiApp.core.services')
    .factory('InitCtrlService', function ($filter, SettingsService, v4NgTable) {

      // var deb = debug('debtee:InitCtrlService');

      function setup(ctrl) {

        return angular.extend(ctrl, {
          setupNgTable: function (model) {
            return v4NgTable.setup (ctrl, model);
          }
        });

      }

      function init(ctrl, scope) {

        function setAgent(o, n) {
          var agent = n || o;
          if (!agent) {
            return;
          }

          ctrl.onSetAgent(agent);
        }

        //watchers
        //scope.$watch('ctrl.searchText', function () {
        //  if (ctrl.ngTable) {
        //    ctrl.ngTableParams.reload();
        //  }
        //});

        scope.$on('current-agent', setAgent);

        setAgent(SettingsService.getCurrentAgent());

      }

      return {
        init: init,
        setup: setup
      };

    })
  ;

}());
