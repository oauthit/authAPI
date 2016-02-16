'use strict';

(function () {

  angular.module('authApiApp')
    .factory('Operation', function (DS) {
      return DS.defineResource({
        name: 'operation',
        relations: {
          belongsTo: {
            agents: [
              {
                localField: 'lenderAgent',
                localKey: 'lender'
              },
              {
                localField: 'debtorAgent',
                localKey: 'debtor'
              }
            ],
            accounts: [
              {
                localField: 'lenderAccountEntity',
                localKey: 'lenderAccount'
              }, {
                localField: 'debtorAccountEntity',
                localKey: 'debtorAccount'
              }
            ]
          },
          hasOne: {
            currencies: {
              localField: 'currencyEntity',
              localKey: 'currency'
            }
          }
        }
      });
    })
    .run(function (Operation) {
      Operation.fields = [
        {
          key: 'lendorId',
          type: 'select',
          templateOptions: {
            label: 'Owner',
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
            label: 'Contact',
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
            labelProp: 'sign',
            valueProp: 'id',
            description: 'Currency of the operation',
            options: [
              {
                sign: '$',
                name: 'Dollar',
                id: '1'
              },
              {
                sign: '€',
                name: 'Euro',
                id: '2'
              }
            ]
          }
        }
      ];
    });

}());
