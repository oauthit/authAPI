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
                localKey: 'lenderId'
              },
              {
                localField: 'debtor',
                localKey: 'debtorId'
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
    .run(function (Operation, FormlyConfigService) {

      // TODO: need comments functionality on an operation
      // TODO: need operation tagging and searching by tags in operation.list

      var operationInfo = [
        {
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
            label: 'Debtor',
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

      FormlyConfigService.setConfig('operationInfo', operationInfo);
      FormlyConfigService.setConfig('operationCreate', operationCreate);
    });


}());
