'use strict';

export function InitCtrlService(sabNgTable) {
  'ngInject';
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

}
