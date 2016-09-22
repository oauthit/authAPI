'use strict';

export default function(schema, saFormlyConfigService, Auth) {
  'ngInject';
  schema.register({
    name: 'Org',
    relations: {
      hasMany: {
        OrgProviderApp: {
          foreignKey: 'orgId',
          localField: 'providerApps'
        },
        OrgAccount: {
          foreignKey: 'orgId',
          localField: 'accounts'
        },
        OrgApp: {
          foreignKey: 'orgId',
          localField: 'apps'
        },
        OrgAccountRole: {
          foreignKey: 'orgId',
          localField: 'accountRoles'
        },
        OrgRole: {
          foreignKey: 'orgId',
          localField: 'roles'
        }
      }
    },

    methods: {
      isIAmAMember: function () {
        return !!_.find(this.accounts, {accountId: Auth.getCurrentUser().id});
      }
    }

  });

  var orgCreateFields = [
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        label: 'Name',
        type: 'text',
        required: true,
        maxlength: 30
      }
    },
    {
      key: 'isPublic',
      type: 'input',
      templateOptions: {
        label: 'Is public?',
        type: 'checkbox'
      }
    }
  ];

  saFormlyConfigService.setConfig('orgCreateFields', orgCreateFields);
}
