'use strict';

(function () {

  angular.module('authApiApp')
    .factory('Agent', function (DS) {
      return DS.defineResource({
        name: 'agent',
        relations: {
          hasMany: {
            contact: {
              localField: 'contacts',
              foreignKey: 'agent'
            },
            agentInvites: [
              {
                localField: 'ownerInvites',
                foreignKey: 'owner'
              }, {
                localField: 'acceptorInvites',
                foreignKey: 'acceptor'
              }
            ],
            agentOperations: [
              {
                localField: 'lenderOperations',
                foreignKey: 'lender'
              },
              {
                localField: 'debtorOperations',
                foreignKey: 'debtor'
              }
            ]
          }
        }
      });
    })
    .run(function (Agent) {
      Agent.fields = [
        {
          key: 'currencyId',
          type: 'select',
          templateOptions: {
            label: 'Default currency:',
            options: [],
            valueProp: 'id',
            labelProp: 'symbol'
          }
        },
        {
          key: 'name',
          type: 'input',
          templateOptions: {
            label: 'Name:',
            type: 'text',
            placeholder: 'Name',
            required: true
          }
        }
      ]
    });

}());
