'use strict';

(function () {

  class OperationAddController {

    constructor() {

      this.operation = {};
      this.operationFields = [
        {
          key: 'total',
          type: 'input',
          templateOptions: {
            label: 'Total',
            placeholder: 'Total',
            required: true,
            description: 'Enter total'
          }
        }
      ];
    }

    onSubmit() {

    }
  }

  angular.module('authApiApp')
    .controller('OperationAddCtrl', OperationAddController);

}());
