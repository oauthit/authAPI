'use strict';

export default function(schema) {
  'ngInject';
  schema.register({
    name: 'OrgRole',
    relations: {
      hasOne: {
        Role: {
          localKey: 'roleId',
          localField: 'role'
        },
        Org: {
          localKey: 'orgId',
          localField: 'org'
        }
      }
    }
  });

}
