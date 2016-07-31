'use strict';

// TODO show and edit account data

function SettingsController($window,
                            $q,
                            Auth,
                            saFormlyConfigService,
                            schema,
                            saMessageService,
                            sabErrorsService) {

  var vm = this;

  const Account = schema.model('Account');
  const ProviderAccount = schema.model('ProviderAccount');

  var originalModelFields;
  var fields = saFormlyConfigService.getConfigFieldsByKey('accountInfo');

  function saveOriginalFields(data) {
    originalModelFields = _.pick(data, _.map(fields, (field) => {
      return field.key;
    }));
  }

  /**
   * Get current account and his providerAccounts
   */
  function init() {
    vm.busy = $q(function (resolve, reject) {
      Account.find('me').then(function (acc) {

        vm.account = acc;
        saveOriginalFields(acc);

        Account.loadRelations(acc, ['ProviderAccount']).then(function () {
          vm.providerAccounts = acc.providerAccounts;
          resolve();
        })
          .catch(reject);

      }).catch(reject);
    });
  }

  angular.extend(vm, {

    fields: fields,
    buttons: [
      {
        name: 'Manage agents',
        sref: 'auth.agent.manage'
      }
    ],

    onCancel: function (form) {
      angular.extend(vm.account, originalModelFields);
      form.$setPristine();
    },

    hasProviderLinked: function (provider) {
      return _.find(vm.providers, {provider: provider});
    },

    onSubmit: function (form) {
      Account.save(vm.account.id)
        .then(function () {
          saMessageService.success('Account have been updated', 'Success!');
          form.$setPristine();
        })
        .catch(sabErrorsService.addError);
    },

    link: function (provider) {
      $window.location.href = '/auth/' + provider + '?accountId=' + vm.originalModel.id;
    },

    unlink: function (provider) {
      let providerAccountId = _.find(ProviderAccount.getAll(), {provider: provider}).id;
      ProviderAccount.destroy(providerAccountId).then(() => {
        init();
      });
    }

  });

  init();
}

angular.module('authApiApp')
  .controller('SettingsController', SettingsController);
