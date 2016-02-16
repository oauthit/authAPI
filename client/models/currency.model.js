'use strict';

(function () {

  angular.module('authApiApp')
    .factory('Currency', function (DS) {
      return DS.defineResource({
        name: 'currency',
        relations: {
          hasMany: {
            accounts: {
              localField: 'accounts',
              foreignKey: 'currency'
            }
          }
        }
      });
    })
    .run(function (Currency) {
      console.log (Currency);
    });

}());
