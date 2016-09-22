'use strict';

export default function (schema) {
  'ngInject';
  schema.register({
    name: 'Role',
    relations: {
      hasMany: {
        OrgAccountRole: {
          foreignKey: 'roleId',
          localField: 'orgAccountRoles'
        },
        OrgRole: {
          foreignKey: 'roleId',
          localField: 'roleOrgs'

        }
      }
    }
  });
}
