'use strict';

export default function(schema) {
  'ngInject';
  schema.register({
    name: 'OrgAccountRole',
    relations: {
      hasOne: {
        Account: {
          localKey: 'accountId',
          localField: 'account'
        },
        Org: {
          localKey: 'orgId',
          localField: 'org'
        },
        Role: {
          localKey: 'roleId',
          localField: 'role'
        },
        OrgAccount: {
          localKey: 'orgAccountId',
          localField: 'orgAccount'
        }
      }
    }
  });

}
