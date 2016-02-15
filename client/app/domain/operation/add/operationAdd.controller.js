'use strict';

(function () {

  class OperationAddController {

    constructor() {

      this.operation = {};
      this.operationFields = [
        {
          key: 'owner',
          type: 'input',
          templateOptions: {
            label: 'Owner',
            type: 'text',
            placeholder: 'Owner',
            required: true,
            disabled: true,
            description: 'Owner of the operation'
          }
        },
        {
          key: 'contact',
          type: 'input',
          templateOptions: {
            label: 'Contact',
            type: 'text',
            placeholder: 'Contact',
            required: true,
            disabled: true,
            description: 'Contact which interacts in operation'
          }
        },
        {
          key: 'total',
          type: 'input',
          templateOptions: {
            label: 'Total',
            type: 'number',
            placeholder: 'Total',
            required: true,
            description: 'Enter total'
          }
        },
        {
          key: 'currency',
          type: 'select',
          templateOptions: {
            label: 'Select currency',
            labelProp: 'sign',
            description: 'Currency of the operation',
            options: [
              {
                sign: '$',
                name: 'Dollar'
              },
              {
                sign: '€',
                name: 'Euro'
              }
            ]
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
