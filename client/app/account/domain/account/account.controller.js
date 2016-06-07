(function () {
  'use strict';

  angular.module('authApiApp')
    .controller('AccountController', function ($q,
                                               Auth,
                                               localStorageService,
                                               InitCtrlService,
                                               saFormlyConfigService,
                                               saMessageService,
                                               sabErrorsService,
                                               schema) {

      let vm = InitCtrlService.setup(this);

      angular.extend(vm, {
        ngTable: {
          count: 12
        },
        accessToken: localStorageService.get('access-token'),
        getRedirectUrl: function (url) {
          return `${url}?access-token=${vm.accessToken}`
        }
      });

      const Account = schema.model('Account');
      const ProviderAccount = schema.model('ProviderAccount');
      const Org = schema.model('Org');
      const App = schema.model('App');

      Auth.getCurrentUser(function (account) {
        vm.originalModel = angular.copy(account);
        vm.model = account;
      });

      /**
       * Get current account and his providerAccounts
       */
      function init() {
        vm.busy = $q(function (resolve, reject) {
          Account.find('me').then(function (acc) {

            vm.acc = acc;

            Account.loadRelations(acc, ['ProviderAccount']).then(function () {
                vm.providerAccounts = acc.providerAccounts;

                resolve();
              })
              .catch(function (err) {
                console.log(err);
                reject();
              });
          }).catch(err => {
            console.log(err);
            reject();
          });
        });
      }

      vm.orgNgTableParams = vm.setupNgTable({
        getCount: function (params, options) {
          let p = params || {};
          let o = options || {};
          return Org.getCount([p, o]);
        },

        findAll: function (params, o) {
          return Org.findAll(angular.extend({}, params), o);
        }
      });

      vm.providerAccNgTableParams = vm.setupNgTable({
        getCount: function (params, options) {
          let p = params || {};
          let o = options || {};
          return ProviderAccount.getCount([p, o]);
        },

        findAll: function (params, o) {
          return ProviderAccount.findAll(angular.extend({}, params), o);
        }
      });

      vm.appNgTableParams = vm.setupNgTable({
        getCount: function (params, options) {
          let p = params || {};
          let o = options || {};
          return App.getCount([p, o]);
        },

        findAll: function (params, o) {
          return App.findAll(angular.extend({}, params), o);
        }
      });

      angular.extend(vm, {

        fields: saFormlyConfigService.getConfigFieldsByKey('accountInfo'),

        onCancel: function (form) {
          vm.model = angular.copy(vm.originalModel);
          form.$setPristine();
        },

        hasProviderLinked: function (provider) {
          return _.find(vm.providers, {provider: provider});
        },

        onSubmit: function () {
          var data = {
            name: vm.model.name
          };
          Account.create(data).then(function () {
            saMessageService.success('Account have been updated', 'Success!');
          }, function (err) {
            sabErrorsService.addError(err);
          });
        }

      });

      init();

    })
})();
