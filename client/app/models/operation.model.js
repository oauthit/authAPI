'use strict';

(function () {

  var deb = debug('debtee:operation.model');

  angular.module('authApiApp')
    .factory('Operation', function (DS) {
      return DS.defineResource({
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
    .run(function (ExtendModelService, Operation) {

      ExtendModelService(Operation);

      // TODO: need comments functionality on an operation
      // TODO: need operation tagging and searching by tags in operation.list

      Operation.fieldsInfo = [
        {
          key: 'debtorId',
          type: 'select',
          templateOptions: {
            label: 'Debtor',
            valueProp: 'id',
            //description: 'The other agent of the operation',
            options: []
          }
        },{
          key: 'lenderId',
          type: 'select',
          templateOptions: {
            label: 'Debtor',
            valueProp: 'id',
            //description: 'The other agent of the operation',
            options: []
          }
        },{
          key: 'total',
          type: 'input',
          templateOptions: {
            label: 'Total',
            type: 'number',
            placeholder: 'Total',
            required: true
          }
        },{
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

      Operation.fields = [
        // TODO: use ui-typeahead and auth-focus this field with dropdown open
        {
          key: 'contact',
          type: 'select',
          templateOptions: {
            label: 'Counter-agent',
            valueProp: 'id',
            description: 'The other agent of the operation',
            options: [],
            ngOptions: 'option as option.counterAgent.name for option in to.options track by option.id'
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
    });

}());
