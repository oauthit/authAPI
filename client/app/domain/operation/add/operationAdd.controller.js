'use strict';

(function () {

  class OperationAddController {

    constructor(operationFields) {
      this.operation = {};
      this.operationFields = operationFields;
    }

    onSubmit() {

    }
  }

  angular.module('authApiApp')
    .controller('OperationAddCtrl', OperationAddController);

}());
