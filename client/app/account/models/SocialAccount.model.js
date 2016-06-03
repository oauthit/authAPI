(function (ng) {
  'use strict';
  ng.module('authApiApp.admin.models')
    .run(function (schema) {
      schema.register({
        name: 'SocialAccount',
        //relations: {
        //  hasOne: {
        //    ProviderAccount: {
        //      foreignKey: 'providerAccountId',
        //      localField: 'providerAccount'
        //    }
        //  }
        //}
      });
    })
  ;

})(angular);
