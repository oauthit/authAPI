'use strict';

(function () {

  angular.module('authApiApp')
    .factory('Operation', function (ModelService) {
      return ModelService.define({
        name: 'operation',
        relations: {
          belongsTo: {
            counterAgent: [
              {
                localField: 'lender',
                localKey: 'lenderAgentId'
              },
              {
                localField: 'debtor',
                localKey: 'debtorAgentId'
              }
            ]
          },
          hasOne: {
            currency: {
              localField: 'currency',
              localKey: 'currencyId'
            }
          }
        }
      });
    })
    .run(function (Operation, saFormlyConfigService) {

      // TODO: need comments functionality on an operation
      // TODO: need operation tagging and searching by tags in operation.list

      var operationInfo = [
        {
          key: 'status',
          type: 'input',
          templateOptions: {
            label: 'Status',
            disabled: true
          }
        }, {
          key: 'debtorId',
          type: 'select',
          templateOptions: {
            label: 'Debtor',
            valueProp: 'id',
            //description: 'The other agent of the operation',
            options: []
          }
        }, {
          key: 'lenderId',
          type: 'select',
          templateOptions: {
            label: 'Lender',
            valueProp: 'id',
            //description: 'The other agent of the operation',
            options: []
          }
        }, {
          key: 'total',
          type: 'inputWithAddon',
          templateOptions: {
            label: 'Total',
            type: 'number',
            placeholder: 'Total',
            options: [],
            valueProp: 'id',
            labelProp: 'symbol',
            dropdownKey: 'currency'
          }
        }
      ];

      var operationCreate = [
        {
          key: 'contact',
          type: 'typeahead',
          templateOptions: {
            label: 'Counter-agent',
            description: 'The other agent of the operation',
            required: true,
            options: []
          },
          data: {
            typeahead: 'uib-typeahead="item as item.counterAgent.name for item in to.liveSearch($viewValue)"',
            typeaheadOnSelect: 'typeahead-on-select="to.onSelect($item)"'
          }
        },
        {
          key: 'total',
          type: 'inputWithAddon',
          templateOptions: {
            label: 'Total',
            type: 'number',
            placeholder: 'Total',
            options: [],
            valueProp: 'id',
            labelProp: 'symbol',
            dropdownKey: 'currency',
            required: true
          }
        },
        {
          key: 'role',
          type: 'radio',
          templateOptions: {
            label: 'Choose type of operation',
            required: true,
            options: [
              {
                name: 'Borrow',
                value: 'debt'
              },
              {
                name: 'Lend',
                value: 'lend'
              }
            ]
          }
        }
      ];

      saFormlyConfigService.setConfig('operationInfo', operationInfo);
      saFormlyConfigService.setConfig('operationCreate', operationCreate);
    });


}());
