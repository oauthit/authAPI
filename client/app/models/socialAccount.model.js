'use strict';

(function () {

  angular.module('authApiApp.admin.models')
    .run(function (schema) {
      schema.register({
        name: 'SocialAccount',
        //relations: {
        //  hasOne: {
        //    providerAccount: {
        //      foreignKey: 'providerAccountId',
        //      localField: 'providerAccount'
        //    }
        //  }
        //}
      });
    })
  ;

})();
