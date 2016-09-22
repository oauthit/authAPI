'use strict';

export default function(schema) {
  'ngInject';
  schema.register({
    name: 'OrgProviderApp',
    relations: {
      hasOne: {
        ProviderApp: {
          localKey: 'providerAppId',
          localField: 'providerApp'
        },
        Org: {
          localKey: 'orgId',
          localField: 'org'
        }
      }
    }
  });
}
