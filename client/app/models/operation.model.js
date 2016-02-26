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
          type: 'input',
          templateOptions: {
            label: 'Total',
            type: 'number',
            placeholder: 'Total',
            required: true
          }
        }, {
          /** TODO: need a custom formly type for combined number and currency field
           * http://getbootstrap.com/components/#input-groups-buttons-dropdowns
           **/
          key: 'currencyId',
          type: 'select',
          templateOptions: {
            label: 'Select currency',
            labelProp: 'symbol',
            valueProp: 'id',
            options: []
          }
        }
      ];

      var operationCreate = [
        // TODO: use ui-typeahead and auth-focus this field with dropdown open
        {
          key: 'contact',
          type: 'typeahead',
          templateOptions: {
            label: 'Counter-agent',
            description: 'The other agent of the operation',
            options: []
          },
          data: {
            typeaheadOptions: 'item as item.counterAgent.name for item in to.liveSearch($viewValue)'
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
          key: 'currencyId',
          type: 'select',
          templateOptions: {
            label: 'Select currency',
            labelProp: 'symbol',
            valueProp: 'id',
            description: 'Currency of the operation',
            options: []
          }
        },
        {
          key: 'role',
          type: 'radio',
          templateOptions: {
            label: 'Choose type of operation',
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
