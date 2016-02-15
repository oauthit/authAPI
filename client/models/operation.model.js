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
        },
        validate: function (Operation, operation, cb) {
          var operationSchema = {
            lender: {
              presence: true
            },
            debtor: {
              presence: true
            },
            total: {
              presence: true
            }
          };

          var err = validate(operation, operationSchema);
          if (err) {
            cb(err);
          } else {
            cb(null, operation);
          }
        }
      });
    })
    .run(function (Operation) {
      Operation.fields = [
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
    });

}());
