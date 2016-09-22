'use strict';

export default function(schema, saFormlyConfigService) {
  'ngInject';
  schema.register({
    name: 'App',
    relations: {
      hasMany: {
        OrgApp: {
          foreignKey: 'appId',
          localField: 'apps'
        }
      }
    }
  });

  var appCreateFields = [
    {
      key: 'url',
      type: 'input',
      templateOptions: {
        label: 'Url',
        type: 'url',
        required: true,
        maxlength: 30,
        placeholder: 'Enter app url address'
      }
    }
  ];

  saFormlyConfigService.setConfig('appCreateFields', appCreateFields);
}
