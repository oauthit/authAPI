'use strict';

(function () {

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
    .run(function (Operation) {
      Operation.fields = [
        {
          key: 'lenderId',
          type: 'select',
          templateOptions: {
            label: 'Lender',
            required: true,
            description: 'Owner of the operation',
            options: [],
            valueProp: 'id',
            labelProp: 'name'
          }
        },
        {
          key: 'debtorId',
          type: 'select',
          templateOptions: {
            label: 'Debtor',
            required: true,
            description: 'Contact which interacts in operation',
            options: [],
            valueProp: 'id',
            labelProp: 'name'
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
        }
      ];
    });

}());
