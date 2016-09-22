'use strict';

export default function(schema) {
  'ngInject';
  schema.register({
    name: 'OrgApp',
    relations: {
      hasOne: {
        App: {
          localKey: 'appId',
          localField: 'app'
        },
        Org: {
          localKey: 'orgId',
          localField: 'org'
        }
      }
    }
  });
}
